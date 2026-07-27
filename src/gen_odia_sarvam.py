# -*- coding: utf-8 -*-
import csv
import os
from sarvamai import SarvamAI
from sarvamai.play import save

key = None
with open('.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('SARVAM_API_KEY'):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")

client = SarvamAI(api_subscription_key=key)
os.makedirs("audio", exist_ok=True)

def slug(e):
    return e.lower().replace(' ', '_').replace('/', '_').replace("'", "").replace(",", "")

phrases = []
with open('data/hindi_english_sanskrit_tamil_odia_phrases.csv', 'r', encoding='utf-8-sig') as f:
    for row in csv.DictReader(f):
        e = row['english_translation'].strip()
        od = row['odia_translation'].strip()
        phrases.append((e, od))

print(f"Generating Odia audio for {len(phrases)} phrases with Sarvam...")

made = skipped = failed = 0
for i, (e, od) in enumerate(phrases):
    fn = f"audio/odia_{slug(e)}.wav"
    if os.path.exists(fn):
        skipped += 1
    else:
        try:
            resp = client.text_to_speech.convert(
                text=od, target_language_code="od-IN",
                model="bulbul:v3", speaker="priya")
            save(resp, fn)
            made += 1
        except Exception as ex:
            failed += 1
            if failed <= 3:
                print(f"  [FAIL] {e}: {ex}")
    if (i + 1) % 50 == 0:
        print(f"[{i+1}/{len(phrases)}] made={made} skipped={skipped} failed={failed}")

print(f"\nDONE. New: {made}, existed: {skipped}, failed: {failed}")