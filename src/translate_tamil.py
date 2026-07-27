# -*- coding: utf-8 -*-
# Translates all phrases to Tamil.
# Run:  .venv\Scripts\python.exe src\translate_tamil.py
# Takes ~10-15 min for 844 phrases.

import csv
import asyncio
from googletrans import Translator

async def translate_all():
    translator = Translator()

    phrases = []
    # Read from the Sanskrit CSV since it already has hindi/english/category
    with open('data/hindi_english_sanskrit_phrases.csv', 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            h = row['hindi_phrase'].strip()
            e = row['english_translation'].strip()
            sa = row['sanskrit_translation'].strip()
            c = row.get('category', 'Other').strip()
            phrases.append((h, e, sa, c))

    print(f"Translating {len(phrases)} phrases to Tamil...")

    results = []
    for i, (h, e, sa, c) in enumerate(phrases):
        try:
            result = await translator.translate(e, src='en', dest='ta')
            ta = result.text
            results.append((h, e, sa, ta, c))
        except Exception as err:
            print(f"Error translating '{e}': {err}")
            results.append((h, e, sa, e, c))  # fallback to English

        if (i + 1) % 50 == 0:
            print(f"[{i+1}/{len(phrases)}] Translated...")

    with open('data/hindi_english_sanskrit_tamil_phrases.csv', 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.writer(f)
        w.writerow(['hindi_phrase', 'english_translation', 'sanskrit_translation', 'tamil_translation', 'category'])
        for h, e, sa, ta, c in results:
            w.writerow([h, e, sa, ta, c])

    print(f"Saved {len(results)} phrases with Tamil translations!")
    print("Next: .venv\\Scripts\\python.exe src\\gen_tamil_audio.py")

asyncio.run(translate_all())
