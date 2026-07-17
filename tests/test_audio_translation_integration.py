"""Integration test: mock audio recording feeding into translation + database."""

from __future__ import annotations

import uuid

from config import thresholds
from config.metadata_schema import ConsentStatus, RecordingMetadata, SessionMetadata
from src.audio import MockMicrophone, Recorder
from src.database import Database
from src.translation import estimate_novelty, translate_text


def test_record_translate_and_store_pipeline(tmp_path, monkeypatch):
    monkeypatch.setattr(thresholds, "VAD_SILENCE_TIMEOUT_SEC", 0.05)

    mic = MockMicrophone(voiced_frame_count=5)
    recorder = Recorder(microphone=mic)
    wav_path = recorder.record_utterance(tmp_path / "utterance.wav")
    assert wav_path.exists()

    transcript = "धन्यवाद"
    translation = translate_text(transcript)
    novelty = estimate_novelty(transcript)

    db = Database(db_path=tmp_path / "pipeline.db")
    session = SessionMetadata(session_id=str(uuid.uuid4()), consent_status=ConsentStatus.GRANTED)
    db.insert_session(session)

    recording = RecordingMetadata(
        recording_id=str(uuid.uuid4()),
        session_id=session.session_id,
        file_path=str(wav_path),
        duration_sec=1.0,
        transcript=transcript,
        translation=translation,
        novelty_score=novelty,
    )
    db.insert_recording(recording)

    rows = db.get_recordings_for_session(session.session_id)
    assert len(rows) == 1
    assert rows[0]["translation"] == translation
    assert rows[0]["transcript"] == transcript
    db.close()
