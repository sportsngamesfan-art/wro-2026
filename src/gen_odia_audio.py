# -*- coding: utf-8 -*-
import csv
import os
from gtts import gTTS

os.makedirs("audio", exist_ok=True)

phrases = []
with open('data/hindi_english_sanskrit_tamil_odia_phrases.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        e = row['english_translation'].strip()
        od = row['odia_translation'].strip()
        phrases.append((e, od))

print(f"Generating Odia audio for {len(phrases)} phrases...")

count = 0
skipped = 0
failed = 0

for i, (e, od) in enumerate(phrases):
    slug = e.lower().replace(' ', '_').replace('/', '_').replace("'", "")
    filename = f"audio/odia_{slug}.mp3"

    if os.path.exists(filename):
        skipped += 1
    else:
        try:
            gTTS(text=od, lang='or', slow=False).save(filename)
            count += 1
        except Exception as ex:
            failed += 1
            if failed <= 3:
                print(f"  [FAIL] {e}: {ex}")

    if (i + 1) % 100 == 0:
        print(f"[{i+1}/{len(phrases)}] made={count} skipped={skipped} failed={failed}")

print(f"\nDONE. New files: {count}, already existed: {skipped}, failed: {failed}")
print("Next: .venv\\Scripts\\python.exe src\\build_final_5lang.py")