"""Pydantic schemas describing recording/session metadata for BhashaSetu.

Used by database.py to validate rows before persisting and by other modules
whenever they need a well-typed handle on a session or recording.
"""

from __future__ import annotations

import datetime as dt
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ConsentStatus(str, Enum):
    GRANTED = "granted"
    DECLINED = "declined"
    WITHDRAWN = "withdrawn"


class RecordingMetadata(BaseModel):
    """Metadata captured for a single recorded utterance."""

    recording_id: str
    session_id: str
    speaker_id: Optional[str] = None
    language: str = "hindi"
    file_path: str
    duration_sec: float = Field(ge=0)
    sample_rate_hz: int = 16000
    novelty_score: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    transcript: Optional[str] = None
    translation: Optional[str] = None
    recorded_at: dt.datetime = Field(default_factory=dt.datetime.utcnow)


class SessionMetadata(BaseModel):
    """Metadata for one fieldwork session (one visit to one speaker)."""

    session_id: str
    speaker_id: Optional[str] = None
    village_or_location: Optional[str] = None
    consent_status: ConsentStatus = ConsentStatus.DECLINED
    started_at: dt.datetime = Field(default_factory=dt.datetime.utcnow)
    ended_at: Optional[dt.datetime] = None
    notes: Optional[str] = None
