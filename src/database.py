"""SQLite persistence for BhashaSetu recording/session metadata.

Uses the stdlib sqlite3 module; rows are built from the pydantic models in
config/metadata_schema.py, which validate the data before it ever reaches
the database.
"""

from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import List, Union

from config.metadata_schema import RecordingMetadata, SessionMetadata
from src.logbook import Logbook

logger = Logbook("DATABASE")

DEFAULT_DB_PATH = Path(__file__).resolve().parent.parent / "data" / "bhashasetu.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    speaker_id TEXT,
    village_or_location TEXT,
    consent_status TEXT NOT NULL,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS recordings (
    recording_id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    speaker_id TEXT,
    language TEXT NOT NULL,
    file_path TEXT NOT NULL,
    duration_sec REAL NOT NULL,
    sample_rate_hz INTEGER NOT NULL,
    novelty_score REAL,
    transcript TEXT,
    translation TEXT,
    recorded_at TEXT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);
"""


class Database:
    """Thin wrapper around a SQLite connection for sessions and recordings."""

    def __init__(self, db_path: Union[Path, str] = DEFAULT_DB_PATH):
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._conn = sqlite3.connect(self.db_path)
        self._conn.row_factory = sqlite3.Row
        self._conn.executescript(SCHEMA)
        self._conn.commit()
        logger.log(f"Connected to database at {self.db_path}")

    def insert_session(self, session: SessionMetadata) -> None:
        """Insert or replace one fieldwork session's metadata."""
        self._conn.execute(
            """
            INSERT OR REPLACE INTO sessions
                (session_id, speaker_id, village_or_location, consent_status,
                 started_at, ended_at, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                session.session_id,
                session.speaker_id,
                session.village_or_location,
                session.consent_status.value,
                session.started_at.isoformat(),
                session.ended_at.isoformat() if session.ended_at else None,
                session.notes,
            ),
        )
        self._conn.commit()
        logger.log(f"Inserted session {session.session_id}")

    def insert_recording(self, recording: RecordingMetadata) -> None:
        """Insert or replace one recorded utterance's metadata."""
        self._conn.execute(
            """
            INSERT OR REPLACE INTO recordings
                (recording_id, session_id, speaker_id, language, file_path,
                 duration_sec, sample_rate_hz, novelty_score, transcript,
                 translation, recorded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                recording.recording_id,
                recording.session_id,
                recording.speaker_id,
                recording.language,
                recording.file_path,
                recording.duration_sec,
                recording.sample_rate_hz,
                recording.novelty_score,
                recording.transcript,
                recording.translation,
                recording.recorded_at.isoformat(),
            ),
        )
        self._conn.commit()
        logger.log(f"Inserted recording {recording.recording_id}")

    def get_recordings_for_session(self, session_id: str) -> List[sqlite3.Row]:
        """Return all recordings belonging to a session, most recent first."""
        cursor = self._conn.execute(
            "SELECT * FROM recordings WHERE session_id = ? ORDER BY recorded_at DESC",
            (session_id,),
        )
        return cursor.fetchall()

    def close(self) -> None:
        """Close the underlying SQLite connection."""
        self._conn.close()
        logger.log("Database connection closed")
