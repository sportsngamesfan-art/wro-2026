"""Audio capture and voice-activity detection for BhashaSetu.

Stage 1 (bench testing): MockMicrophone synthesizes audio frames instead of
reading from a real device. Stage 2 (on Pi 5): RealMicrophone streams from a
USB microphone via PyAudio.
"""

from __future__ import annotations

import math
import platform
import random
import struct
import time
import wave
from abc import ABC, abstractmethod
from pathlib import Path
from typing import List, Optional

from config import thresholds
from src.logbook import Logbook

logger = Logbook("AUDIO")

ON_PI = platform.machine() == "aarch64"

SAMPLE_WIDTH_BYTES = 2  # 16-bit PCM

# Safety cap on total frames read per utterance (~60s at the default 30ms
# frame size), so a microphone that never reports silence can't hang forever.
MAX_UTTERANCE_FRAMES = 2000


class MicrophoneBase(ABC):
    @abstractmethod
    def read_frame(self) -> bytes:
        """Read one frame of raw 16-bit PCM audio."""

    @abstractmethod
    def close(self) -> None:
        """Release microphone resources."""


class MockMicrophone(MicrophoneBase):
    """Laptop-safe microphone stub that synthesizes PCM frames.

    Returns `voiced_frame_count` loud (voiced) frames, then quiet (silent)
    frames afterward -- enough to exercise VAD-based recording end-to-end.
    """

    def __init__(
        self,
        sample_rate: int = thresholds.VAD_SAMPLE_RATE_HZ,
        voiced_frame_count: int = 20,
    ):
        self.sample_rate = sample_rate
        self.voiced_frame_count = voiced_frame_count
        self._frames_read = 0
        self._frame_samples = int(sample_rate * thresholds.VAD_FRAME_DURATION_MS / 1000)
        logger.log("[MOCK] Microphone initialized (synthetic PCM)")

    def read_frame(self) -> bytes:
        voiced = self._frames_read < self.voiced_frame_count
        self._frames_read += 1
        amplitude = 8000 if voiced else 50
        samples = [
            int(
                amplitude * math.sin(2 * math.pi * 440 * i / self.sample_rate)
                + random.uniform(-20, 20)
            )
            for i in range(self._frame_samples)
        ]
        logger.log(f"[MOCK] Read audio frame ({'voiced' if voiced else 'silent'})")
        return struct.pack(f"<{len(samples)}h", *samples)

    def close(self) -> None:
        logger.log("[MOCK] Microphone closed")


class RealMicrophone(MicrophoneBase):
    """USB microphone via PyAudio."""

    def __init__(self, sample_rate: int = thresholds.VAD_SAMPLE_RATE_HZ):
        import pyaudio

        self.sample_rate = sample_rate
        self._frame_samples = int(sample_rate * thresholds.VAD_FRAME_DURATION_MS / 1000)
        self._pa = pyaudio.PyAudio()
        self._stream = self._pa.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=sample_rate,
            input=True,
            frames_per_buffer=self._frame_samples,
        )
        logger.log("Real microphone initialized (PyAudio)")

    def read_frame(self) -> bytes:
        return self._stream.read(self._frame_samples, exception_on_overflow=False)

    def close(self) -> None:
        self._stream.stop_stream()
        self._stream.close()
        self._pa.terminate()
        logger.log("Microphone closed")


def get_microphone() -> MicrophoneBase:
    """Return the appropriate microphone implementation for the current platform."""
    return RealMicrophone() if ON_PI else MockMicrophone()


def frame_energy_db(frame: bytes) -> float:
    """Compute the RMS energy of a 16-bit PCM frame, in decibels relative to full scale."""
    sample_count = len(frame) // SAMPLE_WIDTH_BYTES
    if sample_count == 0:
        return -float("inf")

    samples = struct.unpack(f"<{sample_count}h", frame)
    mean_square = sum(s * s for s in samples) / sample_count
    if mean_square <= 0:
        return -float("inf")

    rms = math.sqrt(mean_square)
    return 20 * math.log10(rms / 32768.0)


def is_voiced(frame: bytes) -> bool:
    """Return True if a frame's energy exceeds the VAD threshold (Decision 3)."""
    return frame_energy_db(frame) > thresholds.VAD_ENERGY_THRESHOLD_DB


class Recorder:
    """Records voiced audio to a WAV file using simple energy-based VAD."""

    def __init__(self, microphone: Optional[MicrophoneBase] = None):
        self.microphone = microphone or get_microphone()

    def record_utterance(self, output_path: Path) -> Path:
        """Record frames until VAD_SILENCE_TIMEOUT_SEC of silence follows voiced audio.

        Implements Decision 3 (Voice-Activity Detection): recording starts once
        a voiced frame is seen and ends once silence has persisted long enough.
        """
        frames: List[bytes] = []
        last_voiced_time: Optional[float] = None
        started = False
        total_reads = 0

        while total_reads < MAX_UTTERANCE_FRAMES:
            frame = self.microphone.read_frame()
            total_reads += 1
            voiced = is_voiced(frame)
            now = time.monotonic()

            if voiced:
                frames.append(frame)
                last_voiced_time = now
                started = True
            elif started:
                frames.append(frame)
                if last_voiced_time and (now - last_voiced_time) > thresholds.VAD_SILENCE_TIMEOUT_SEC:
                    break

        self._write_wav(output_path, frames)
        logger.log(f"Wrote utterance ({len(frames)} frames) to {output_path}")
        return output_path

    def _write_wav(self, output_path: Path, frames: List[bytes]) -> None:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with wave.open(str(output_path), "wb") as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(SAMPLE_WIDTH_BYTES)
            wav_file.setframerate(self.microphone.sample_rate)
            wav_file.writeframes(b"".join(frames))
