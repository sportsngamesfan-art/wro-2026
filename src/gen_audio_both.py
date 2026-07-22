# -*- coding: utf-8 -*-
# Generates BOTH Hindi and English MP3s for every phrase in the master CSV.
# Run:  .venv\Scripts\python.exe src\gen_audio_both.py
# Needs internet (gTTS uses Google's servers). Safe to re-run: skips files that exist.

import csv
import os
from gtts import gTTS

os.makedirs("audio", exist_ok=True)

def slug(english):
    return (
        english.lower()
        .replace(" ", "_")
        .replace("/", "_")
        .replace("'", "")
        .replace(",", "")
    )

phrases = []
with open("data/hindi_english_phrases_master.csv", "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        hindi = row["hindi_phrase"].strip()
        english = row["english_translation"].strip()
        if hindi and english:
            phrases.append((hindi, english))

print(f"Found {len(phrases)} phrases. Generating Hindi + English audio...")
print("This creates up to", len(phrases) * 2, "files. It may take 30-60 minutes.")
print("You can stop anytime with Ctrl+C and re-run later - it skips finished files.\n")

made, skipped, failed = 0, 0, 0

for i, (hindi, english) in enumerate(phrases, 1):
    # English audio
    en_path = f"audio/{slug(english)}.mp3"
    if os.path.exists(en_path):
        skipped += 1
    else:
        try:
            gTTS(text=english, lang="en", slow=False).save(en_path)
            made += 1
        except Exception as e:
            failed += 1
            print(f"  [SKIP en] {english}: {e}")

    # Hindi audio
    hi_path = "audio/hindi_" + hindi.replace(" ", "_") + ".mp3"
    if os.path.exists(hi_path):
        skipped += 1
    else:
        try:
            gTTS(text=hindi, lang="hi", slow=False).save(hi_path)
            made += 1
        except Exception as e:
            failed += 1
            print(f"  [SKIP hi] {hindi}: {e}")

    if i % 25 == 0:
        print(f"[{i}/{len(phrases)}] made={made} skipped={skipped} failed={failed}")

print(f"\nDONE. New files: {made}, already existed: {skipped}, failed: {failed}")
print("Now open audio_player.html and everything should play in both languages.")
