# -*- coding: utf-8 -*-
import csv
import asyncio
from googletrans import Translator

async def translate_all():
    translator = Translator()

    phrases = []
    with open('data/hindi_english_sanskrit_tamil_phrases.csv', 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            h = row['hindi_phrase'].strip()
            e = row['english_translation'].strip()
            sa = row['sanskrit_translation'].strip()
            ta = row['tamil_translation'].strip()
            c = row.get('category', 'Other').strip()
            phrases.append((h, e, sa, ta, c))

    print(f"Translating {len(phrases)} phrases to Odia...")

    results = []
    for i, (h, e, sa, ta, c) in enumerate(phrases):
        try:
            result = await translator.translate(e, src='en', dest='or')
            od = result.text
            results.append((h, e, sa, ta, od, c))
        except Exception as err:
            print(f"Error translating '{e}': {err}")
            results.append((h, e, sa, ta, e, c))

        if (i + 1) % 50 == 0:
            print(f"[{i+1}/{len(phrases)}] Translated...")

    with open('data/hindi_english_sanskrit_tamil_odia_phrases.csv', 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.writer(f)
        w.writerow(['hindi_phrase', 'english_translation', 'sanskrit_translation', 'tamil_translation', 'odia_translation', 'category'])
        for h, e, sa, ta, od, c in results:
            w.writerow([h, e, sa, ta, od, c])

    print(f"Saved {len(results)} phrases with Odia translations!")
    print("Next: .venv\\Scripts\\python.exe src\\gen_odia_audio.py")

asyncio.run(translate_all())