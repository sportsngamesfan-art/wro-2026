import csv
from gtts import gTTS

# Read CSV
phrases = []
with open('data/hindi_english_phrases_700.csv', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for line in lines[1:]:
        parts = line.strip().split(',', 1)
        if len(parts) == 2:
            hindi = parts[0].strip()
            english = parts[1].strip()
            if hindi and english:
                phrases.append((hindi, english))

print(f"Generating HINDI audio for {len(phrases)} phrases...")

count = 0
for hindi, english in phrases:
    # Use Hindi phrase for filename
    filename = f"audio/hindi_{hindi.replace(' ', '_')}.mp3"
    
    try:
        # Generate Hindi audio
        tts = gTTS(text=hindi, lang='hi', slow=False)
        tts.save(filename)
        count += 1
        
        if count % 50 == 0:
            print(f"[{count}/{len(phrases)}] Generated Hindi audio...")
    except:
        pass

print(f"✅ Generated {count} HINDI audio files!")