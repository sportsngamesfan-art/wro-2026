"""Tests for src.database SQLite persistence."""

from __future__ import annotations

import uuid

import pytest
from pydantic import ValidationError

from config.metadata_schema import ConsentStatus, RecordingMetadata, SessionMetadata
from src.database import Database


def test_insert_and_retrieve_session(tmp_path):
    db = Database(db_path=tmp_path / "test.db")
    session = SessionMetadata(
        session_id=str(uuid.uuid4()),
        speaker_id="speaker-1",
        village_or_location="Test Village",
        consent_status=ConsentStatus.GRANTED,
    )
    db.insert_session(session)

    row = db._conn.execute(
        "SELECT * FROM sessions WHERE session_id = ?", (session.session_id,)
    ).fetchone()
    assert row["speaker_id"] == "speaker-1"
    assert row["consent_status"] == "granted"
    db.close()


def test_insert_and_retrieve_recording(tmp_path):
    db = Database(db_path=tmp_path / "test.db")
    session = SessionMetadata(session_id=str(uuid.uuid4()), consent_status=ConsentStatus.GRANTED)
    db.insert_session(session)

    recording = RecordingMetadata(
        recording_id=str(uuid.uuid4()),
        session_id=session.session_id,
        file_path="data/test_audio/sample.wav",
        duration_sec=3.2,
        novelty_score=0.7,
        transcript="नमस्ते",
        translation="Hello",
    )
    db.insert_recording(recording)

    rows = db.get_recordings_for_session(session.session_id)
    assert len(rows) == 1
    assert rows[0]["transcript"] == "नमस्ते"
    assert rows[0]["novelty_score"] == 0.7
    db.close()


def test_recording_requires_valid_duration():
    with pytest.raises(ValidationError):
        RecordingMetadata(
            recording_id="r1",
            session_id="s1",
            file_path="x.wav",
            duration_sec=-1.0,
        )
