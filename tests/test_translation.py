"""Tests for src.translation dictionary lookup and novelty scoring."""

from __future__ import annotations

from src.translation import estimate_novelty, translate_text


def test_translate_known_phrase_returns_dictionary_entry():
    assert translate_text("नमस्ते") == "Hello"


def test_translate_unknown_phrase_returns_mock_passthrough():
    translation = translate_text("this phrase is not in the dictionary")
    assert translation.startswith("[MOCK TRANSLATION]")


def test_novelty_of_known_phrase_is_low():
    score = estimate_novelty("नमस्ते")
    assert score < 0.5


def test_novelty_of_unfamiliar_text_is_high():
    score = estimate_novelty("zzqxw completely unfamiliar gibberish 12345")
    assert score > 0.5


def test_novelty_score_is_within_bounds():
    score = estimate_novelty("आप कैसे हैं")
    assert 0.0 <= score <= 1.0


def test_novelty_of_empty_transcript_is_zero():
    assert estimate_novelty("") == 0.0
