"""Tests for src.audio using mock hardware -- no real microphone required."""

from __future__ import annotations

from config import thresholds
from src.audio import MockMicrophone, Recorder, frame_energy_db, is_voiced


def test_frame_energy_db_loud_frame_is_high_energy():
    mic = MockMicrophone(voiced_frame_count=1)
    frame = mic.read_frame()
    assert frame_energy_db(frame) > thresholds.VAD_ENERGY_THRESHOLD_DB


def test_frame_energy_db_silent_frame_is_low_energy():
    mic = MockMicrophone(voiced_frame_count=0)
    frame = mic.read_frame()
    assert frame_energy_db(frame) < thresholds.VAD_ENERGY_THRESHOLD_DB


def test_is_voiced_matches_energy_threshold():
    voiced_mic = MockMicrophone(voiced_frame_count=1)
    assert is_voiced(voiced_mic.read_frame()) is True

    silent_mic = MockMicrophone(voiced_frame_count=0)
    assert is_voiced(silent_mic.read_frame()) is False


def test_record_utterance_writes_nonempty_wav_file(tmp_path, monkeypatch):
    monkeypatch.setattr(thresholds, "VAD_SILENCE_TIMEOUT_SEC", 0.05)

    mic = MockMicrophone(voiced_frame_count=5)
    recorder = Recorder(microphone=mic)
    output_path = tmp_path / "utterance.wav"

    result_path = recorder.record_utterance(output_path)

    assert result_path == output_path
    assert output_path.exists()
    assert output_path.stat().st_size > 0
