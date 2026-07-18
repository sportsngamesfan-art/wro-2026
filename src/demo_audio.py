from gtts import gTTS
import csv
import os

def generate_all_audio():
    """Generate 700 audio files from CSV"""
    
    # Create audio folder if it doesn't exist
    os.makedirs("audio", exist_ok=True)
    
    count = 0
    with open('data/hindi_english_phrases_700.csv', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            english = row['english_translation'].strip()
            
            # Clean filename
            filename = english.replace(' ', '_').replace('/', '_').lower()
            filepath = f"audio/{filename}.mp3"
            
            try:
                tts = gTTS(text=english, lang='en', slow=False)
                tts.save(filepath)
                count += 1
                
                if count % 50 == 0:
                    print(f"[PROGRESS] Generated {count} audio files...")
                
            except Exception as e:
                print(f"[ERROR] Failed to generate {english}: {e}")
    
    print(f"\n[SUCCESS] Generated {count} audio files total!")

if __name__ == "__main__":
    print("[START] Generating 700 audio files from CSV...")
    generate_all_audio()