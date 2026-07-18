"""BhashaSetu entry point.

Stage 1 (bench testing): runs a short demo loop against mock hardware so the
whole pipeline (navigation, vision, audio, translation, database, UI) can be
exercised end-to-end on a laptop with `python -m src.main`.
"""

from __future__ import annotations

import uuid

from config.metadata_schema import ConsentStatus, RecordingMetadata, SessionMetadata
from src.database import Database
from src.logbook import Logbook
from src.navigation import Navigator
from src.translation import estimate_novelty, translate_text
from src.ui import get_screen
# from src.vision import FaceTracker, get_camera

logger = Logbook("MAIN")


def run_demo() -> None:
    """Exercise every module once, end-to-end, using mock hardware."""
    logger.log("BhashaSetu Stage 1 bench-test demo starting")

    screen = get_screen()
    screen.show_message("BhashaSetu", "Starting bench test")

    navigator = Navigator()
    navigator.start()
    for _ in range(3):
        navigator.step()
    navigator.stop()

    # camera = get_camera()
    # face_tracker = FaceTracker()
    frame = camera.capture_frame()
    face_tracker.detect_faces(frame)
    camera.close()

    sample_phrase = "नमस्ते"
    translation = translate_text(sample_phrase)
    novelty = estimate_novelty(sample_phrase)
    screen.show_status(
        {"phrase": sample_phrase, "translation": translation, "novelty": f"{novelty:.2f}"}
    )

    database = Database()
    session = SessionMetadata(
        session_id=str(uuid.uuid4()),
        consent_status=ConsentStatus.GRANTED,
        notes="Bench test demo session",
    )
    database.insert_session(session)

    recording = RecordingMetadata(
        recording_id=str(uuid.uuid4()),
        session_id=session.session_id,
        file_path="data/test_audio/demo.wav",
        duration_sec=2.5,
        transcript=sample_phrase,
        translation=translation,
        novelty_score=novelty,
    )
    database.insert_recording(recording)
    database.close()

    screen.show_message("BhashaSetu", "Bench test demo complete")
    logger.log("BhashaSetu Stage 1 bench-test demo complete")


if __name__ == "__main__":
    pass
    # run_demo()
# Test just translation
from src.translation import translate_phrase
result = translate_phrase("नमस्ते")
print(f"Translation: {result}")