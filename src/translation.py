"""Hindi-English translation and novelty scoring for BhashaSetu.

Stage 1 (bench testing): translation is dictionary-based, backed by
data/hindi_english_phrases.csv. Unknown phrases fall back to a clearly
marked [MOCK] passthrough so a later stage can swap in a real translation
model/API without changing the calling code.
"""

from __future__ import annotations

import csv
from difflib import SequenceMatcher
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional, Set

from src.logbook import Logbook

logger = Logbook("TRANSLATION")

PHRASES_CSV = Path(__file__).resolve().parent.parent / "data" / "hindi_english_phrases.csv"
VOCAB_TXT = Path(__file__).resolve().parent.parent / "data" / "reference_vocabulary.txt"


@lru_cache(maxsize=1)
def _load_phrase_dictionary() -> Dict[str, str]:
    """Load the Hindi -> English phrase dictionary from data/hindi_english_phrases.csv."""
    dictionary: Dict[str, str] = {}
    if not PHRASES_CSV.exists():
        return dictionary

    with open(PHRASES_CSV, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            hindi = row["hindi"].strip()
            english = row["english"].strip()
            dictionary[hindi] = english
    return dictionary


@lru_cache(maxsize=1)
def _load_reference_vocabulary() -> Set[str]:
    """Load the known-vocabulary set from data/reference_vocabulary.txt."""
    if not VOCAB_TXT.exists():
        return set()

    with open(VOCAB_TXT, encoding="utf-8") as f:
        return {line.strip() for line in f if line.strip()}


def translate_text(text: str) -> str:
    """Translate Hindi text to English via dictionary lookup.

    Known phrases return their exact English translation. Unknown phrases
    return a [MOCK] passthrough, standing in for a future real translation
    model/API.
    """
    dictionary = _load_phrase_dictionary()
    text = text.strip()

    if text in dictionary:
        translation = dictionary[text]
        logger.log(f"Translated '{text}' -> '{translation}'")
        return translation

    logger.log(f"[MOCK] No dictionary entry for '{text}' -- passthrough translation")
    return f"[MOCK TRANSLATION] {text}"


def estimate_novelty(transcript: str, known_phrases: Optional[List[str]] = None) -> float:
    """Return a 0-1 novelty score: how dissimilar transcript is from known phrases/vocabulary.

    Used by Decision 4 (Novelty Detection). A score near 1.0 means the
    transcript looks nothing like anything already collected; near 0.0 means
    it closely matches something already known.
    """
    transcript = transcript.strip()
    if not transcript:
        return 0.0

    reference = set(known_phrases or [])
    reference |= _load_reference_vocabulary()
    reference |= set(_load_phrase_dictionary().keys())

    if not reference:
        return 1.0

    best_similarity = max(
        (SequenceMatcher(None, transcript, known).ratio() for known in reference),
        default=0.0,
    )
    novelty = 1.0 - best_similarity
    logger.log(f"Novelty score for '{transcript}': {novelty:.2f}")
    return novelty
