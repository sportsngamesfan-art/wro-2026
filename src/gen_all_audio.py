import csv
from gtts import gTTS

# Read all phrases from CSV
phrases = []
with open('data/hindi_english_phrases_700.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        english = row['english_translation'].strip()
        phrases.append(english)

print(f"Generating {len(phrases)} audio files...")

# Generate audio for each
count = 0
for english in phrases:
    filename = english.lower().replace(' ', '_').replace('/', '_')
    filepath = f"audio/{filename}.mp3"
    
    try:
        tts = gTTS(text=english, lang='en', slow=False)
        tts.save(filepath)
        count += 1
        
        if count % 50 == 0:
            print(f"[{count}/{len(phrases)}] Generated...")
    except:
        pass

print(f"✅ Generated {count} audio files!")