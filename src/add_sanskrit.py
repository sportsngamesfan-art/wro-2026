# -*- coding: utf-8 -*-
import csv
import os
from gtts import gTTS

os.makedirs("audio", exist_ok=True)

# Read existing phrases
phrases = []
with open('data/hindi_english_phrases_master.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        hindi = row['hindi_phrase'].strip()
        english = row['english_translation'].strip()
        cat = row.get('category', 'Other').strip()
        phrases.append((hindi, english, cat))

print(f"Found {len(phrases)} phrases. Generating Sanskrit audio...")

# Generate Sanskrit audio for each English phrase
count = 0
for hindi, english, cat in phrases:
    filename = f"audio/sanskrit_{english.lower().replace(' ', '_').replace('/', '_')}.mp3"
    
    if not os.path.exists(filename):
        try:
            # gTTS with Sanskrit language code 'sa'
            gTTS(text=english, lang='sa', slow=False).save(filename)
            count += 1
            if count % 100 == 0:
                print(f"[{count}/{len(phrases)}] Generated Sanskrit audio...")
        except Exception as e:
            pass

print(f"✅ Generated {count} Sanskrit audio files!")
print("Now update the HTML player with Sanskrit toggle...")