# -*- coding: utf-8 -*-
# Generates Tamil audio for every phrase.
# Run:  .venv\Scripts\python.exe src\gen_tamil_audio.py
# Takes ~30-45 min for 844 phrases. Safe to stop with Ctrl+C and re-run - skips finished files.

import csv
import os
from gtts import gTTS

os.makedirs("audio", exist_ok=True)

phrases = []
with open('data/hindi_english_sanskrit_tamil_phrases.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        e = row['english_translation'].strip()
        ta = row['tamil_translation'].strip()
        phrases.append((e, ta))

print(f"Generating Tamil audio for {len(phrases)} phrases...")

count = 0
skipped = 0
failed = 0

for i, (e, ta) in enumerate(phrases):
    slug = e.lower().replace(' ', '_').replace('/', '_').replace("'", "")
    filename = f"audio/tamil_{slug}.mp3"

    if os.path.exists(filename):
        skipped += 1
    else:
        try:
            # Tamil has real gTTS support - lang code 'ta'
            gTTS(text=ta, lang='ta', slow=False).save(filename)
            count += 1
        except Exception as ex:
            failed += 1

    if (i + 1) % 100 == 0:
        print(f"[{i+1}/{len(phrases)}] made={count} skipped={skipped} failed={failed}")

print(f"\nDONE. New files: {count}, already existed: {skipped}, failed: {failed}")
print("Next: .venv\\Scripts\\python.exe src\\build_final_4lang.py")
