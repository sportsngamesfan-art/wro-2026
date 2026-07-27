# -*- coding: utf-8 -*-
import csv
import asyncio
from googletrans import Translator

async def translate_all():
    translator = Translator()

    phrases = []
    with open('data/hindi_english_phrases_master.csv', 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            h = row['hindi_phrase'].strip()
            e = row['english_translation'].strip()
            c = row.get('category', 'Other').strip()
            phrases.append((h, e, c))

    print(f"Translating {len(phrases)} phrases to Sanskrit...")

    sanskrit_phrases = []
    for i, (h, e, c) in enumerate(phrases):
        try:
            result = await translator.translate(e, src='en', dest='sa')
            sa = result.text
            sanskrit_phrases.append((h, e, sa, c))
        except Exception as err:
            print(f"Error translating '{e}': {err}")
            sanskrit_phrases.append((h, e, e, c))  # fallback to English

        if (i + 1) % 50 == 0:
            print(f"[{i+1}/{len(phrases)}] Translated...")

    with open('data/hindi_english_sanskrit_phrases.csv', 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.writer(f)
        w.writerow(['hindi_phrase', 'english_translation', 'sanskrit_translation', 'category'])
        for h, e, sa, c in sanskrit_phrases:
            w.writerow([h, e, sa, c])

    print(f"Saved {len(sanskrit_phrases)} phrases with Sanskrit translations!")

asyncio.run(translate_all())