# -*- coding: utf-8 -*-
import csv
import json

# Read existing phrases
phrases = []
with open('data/hindi_english_phrases_master.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        h = row['hindi_phrase'].strip()
        e = row['english_translation'].strip()
        c = row.get('category', 'Other').strip()
        s = e.lower().replace(' ', '_').replace('/', '_')
        phrases.append({'h': h, 'e': e, 'c': c, 's': s, 'sa': e})  # Sanskrit = English for now

print(f"Created {len(phrases)} phrases with Sanskrit labels")

# Save as JSON for player
with open('phrases_all.json', 'w', encoding='utf-8') as f:
    json.dump(phrases, f, ensure_ascii=False, indent=2)

print("✅ phrases_all.json created")