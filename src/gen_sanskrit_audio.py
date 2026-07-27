# -*- coding: utf-8 -*-
import csv
import os
from gtts import gTTS

os.makedirs("audio", exist_ok=True)

phrases = []
with open('data/hindi_english_sanskrit_phrases.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        e = row['english_translation'].strip()
        sa = row['sanskrit_translation'].strip()
        phrases.append((e, sa))

print(f"Generating Sanskrit audio for {len(phrases)} phrases...")

count = 0
failed = 0
for e, sa in phrases:
    slug = e.lower().replace(' ', '_').replace('/', '_').replace("'", "")
    filename = f"audio/sanskrit_{slug}.mp3"
    if not os.path.exists(filename):
        try:
            gTTS(text=sa, lang='hi', slow=False).save(filename)  # gTTS doesn't have 'sa', use 'hi' voice for Devanagari
            count += 1
        except Exception as ex:
            failed += 1
    if (count + failed) % 100 == 0:
        print(f"Progress: {count} done, {failed} failed")

print(f"✅ Generated {count} Sanskrit audio files, {failed} failed")