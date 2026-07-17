"""Listening-session orchestration for BhashaSetu.

Coordinates navigation, vision, audio, and translation to carry out the six
autonomous decisions during one fieldwork session.
"""

from __future__ import annotations

import uuid
from enum import Enum, auto
from pathlib import Path
from typing import List, Optional

from config import thresholds
from src.audio import Recorder
from src.database import Database
from src.logbook import Logbook
from src.navigation import NavigationState, Navigator
from src.translation import estimate_novelty
from src.vision import FaceTracker, get_camera

logger = Logbook("LISTENING")

RECORDINGS_DIR = Path(__file__).resolve().parent.parent / "data" / "test_audio"


class ListeningState(Enum):
    SEARCHING = auto()
    GREETING = auto()
    RECORDING = auto()
    ASKING_REPETITION = auto()
    SUGGESTING_REST = auto()
    RETURNING_HOME = auto()


class ListeningSession:
    """Coordinates the six autonomous decisions during one fieldwork session."""

    def __init__(
        self,
        navigator: Optional[Navigator] = None,
        recorder: Optional[Recorder] = None,
        database: Optional[Database] = None,
    ):
        self.navigator = navigator or Navigator()
        self.camera = get_camera()
        self.face_tracker = FaceTracker()
        self.recorder = recorder or Recorder()
        self.database = database or Database()
        self.state = ListeningState.SEARCHING
        self.session_id = str(uuid.uuid4())

    def _set_state(self, new_state: ListeningState) -> None:
        if new_state != self.state:
            logger.log(f"State: {self.state.name} -> {new_state.name}")
            self.state = new_state

    def run_decision_2_speaker_detection(self) -> bool:
        """Decision 2: stop and greet once a face has been stable for FACE_STABLE_SECONDS."""
        frame = self.camera.capture_frame()
        if self.face_tracker.is_speaker_stable(frame):
            self.navigator.stop()
            self._set_state(ListeningState.GREETING)
            logger.log("Greeting speaker")
            return True
        return False

    def run_decision_3_record_utterance(self) -> Path:
        """Decision 3: record a voiced utterance to a WAV file via energy-based VAD."""
        self._set_state(ListeningState.RECORDING)
        output_path = RECORDINGS_DIR / f"{self.session_id}_{uuid.uuid4().hex[:8]}.wav"
        return self.recorder.record_utterance(output_path)

    def run_decision_4_novelty_check(self, transcript: str, known_phrases: List[str]) -> bool:
        """Decision 4: ask for repetition if the utterance's novelty score exceeds threshold."""
        score = estimate_novelty(transcript, known_phrases)
        if score > thresholds.NOVELTY_SCORE_THRESHOLD:
            self._set_state(ListeningState.ASKING_REPETITION)
            logger.log(f"Novelty score {score:.2f} exceeds threshold -- asking for repetition")
            return True
        return False

    def run_decision_5_fatigue_check(
        self, word_count: int, duration_sec: float, pause_sec: float
    ) -> bool:
        """Decision 5: suggest a rest if speech rate is low or a long pause was detected."""
        wpm = (word_count / duration_sec) * 60 if duration_sec > 0 else 0
        fatigued = wpm < thresholds.FATIGUE_MIN_WPM or pause_sec > thresholds.FATIGUE_MAX_PAUSE_SEC
        if fatigued:
            self._set_state(ListeningState.SUGGESTING_REST)
            logger.log(f"Fatigue detected (wpm={wpm:.1f}, pause={pause_sec:.1f}s) -- suggesting rest")
        return fatigued

    def run_decision_6_return_to_start(self) -> None:
        """Decision 6: once recording ends, navigate back to the starting point via IMU."""
        self._set_state(ListeningState.RETURNING_HOME)
        self.navigator.begin_return()
        while self.navigator.state != NavigationState.IDLE:
            self.navigator.step()

    def close(self) -> None:
        """Release camera/audio resources."""
        self.camera.close()
        self.recorder.microphone.close()
