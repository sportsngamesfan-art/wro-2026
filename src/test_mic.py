# -*- coding: utf-8 -*-
import asyncio, time, os, csv, threading
from datetime import datetime
import numpy as np
import sounddevice as sd
from scipy.io.wavfile import write, read
from sarvamai import SarvamAI
from sarvamai.play import save
from googletrans import Translator

key = None
with open('.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('SARVAM_API_KEY'):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")
client = SarvamAI(api_subscription_key=key)

SAMPLERATE = 16000

ALL_LANGS = [
    ("English",  "en", "en-IN"),
    ("Hindi",    "hi", "hi-IN"),
    ("Tamil",    "ta", "ta-IN"),
    ("Sanskrit", "sa", "hi-IN"),
    ("Odia",     "or", "od-IN"),
    ("Punjabi",  "pa", "pa-IN"),
]

def choose_languages():
    print("\nWhich language(s) do you want the translation in?")
    for i, (name, _, _) in enumerate(ALL_LANGS, 1):
        print(f"  {i}. {name}")
    choice = input("Your choice (or 'all'): ").strip().lower()
    if choice in ("all", ""):
        return ALL_LANGS
    picked = []
    for part in choice.split(","):
        part = part.strip()
        if part.isdigit():
            idx = int(part) - 1
            if 0 <= idx < len(ALL_LANGS):
                picked.append(ALL_LANGS[idx])
    return picked if picked else ALL_LANGS

def choose_duration():
    print("\nMax recording time? (seconds, default 5, max 60)")
    choice = input("Duration: ").strip()
    if choice == "":
        return 5
    try:
        return max(1, min(60, int(choice)))
    except:
        return 5

def record(max_duration):
    os.makedirs("recordings", exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"recordings/{stamp}.wav"
    
    print("\nGet ready...")
    for n in (3, 2, 1):
        print(f"  {n}...")
        time.sleep(0.7)
    
    print(f"🎤 SPEAK NOW (press Enter to stop, max {max_duration}s)!")
    
    max_samples = int(max_duration * SAMPLERATE)
    audio_data = []
    stop_recording = [False]
    
    def listen_for_stop():
        input()
        stop_recording[0] = True
    
    listener = threading.Thread(target=listen_for_stop, daemon=True)
    listener.start()
    
    start = time.time()
    while time.time() - start < max_duration and not stop_recording[0]:
        chunk = sd.rec(int(0.1 * SAMPLERATE), samplerate=SAMPLERATE, channels=1, dtype='int16')
        sd.wait()
        audio_data.append(chunk)
        elapsed = time.time() - start
        print(f"  Recording... {elapsed:.1f}s", end='\r')
    
    print(f"\n✅ Recording stopped after {time.time() - start:.1f}s")
    
    if audio_data:
        audio = np.concatenate(audio_data)
    else:
        audio = np.array([], dtype='int16')
    
    write(filename, SAMPLERATE, audio.astype('int16'))
    volume = np.abs(audio).mean() if len(audio) > 0 else 0
    print(f"✅ Saved: {filename}  (volume {volume:.0f})")
    return filename, volume

def transcribe(filename):
    with open(filename, "rb") as f:
        resp = client.speech_to_text.transcribe(
            file=f, model="saarika:v2.5", language_code="unknown"
        )
    return resp.transcript, resp.language_code

async def translate(text, src, dest):
    t = Translator()
    r = await t.translate(text, src=src, dest=dest)
    return r.text

def speak(text, sarvam_lang, lang_code):
    safe_text = "".join(c for c in text if c.isalnum() or c in " _-").strip().replace(" ", "_")
    cache_file = f"tts_cache/{lang_code}_{safe_text}.wav"
    os.makedirs("tts_cache", exist_ok=True)

    if os.path.exists(cache_file):
        print("    (using saved audio, no credits used)")
        rate, data = read(cache_file)
        sd.play(data, rate)
        sd.wait()
        return

    try:
        resp = client.text_to_speech.convert(
            text=text, target_language_code=sarvam_lang,
            model="bulbul:v3", speaker="priya"
        )
        save(resp, cache_file)
        print("    (new audio from Sarvam, saved for next time)")
        rate, data = read(cache_file)
        sd.play(data, rate)
        sd.wait()
    except Exception as e:
        print(f"    (couldn't speak: {e})")

def log_interaction(audio_file, detected_lang, original_text, translations):
    os.makedirs("data", exist_ok=True)
    file_exists = os.path.exists("data/interaction_log.csv")
    with open("data/interaction_log.csv", "a", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        if not file_exists:
            w.writerow(["timestamp", "audio_file", "detected_language", "original_text",
                        "english", "hindi", "tamil", "sanskrit", "odia", "punjabi"])
        w.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            audio_file, detected_lang, original_text,
            translations.get("English", ""),
            translations.get("Hindi", ""),
            translations.get("Tamil", ""),
            translations.get("Sanskrit", ""),
            translations.get("Odia", ""),
            translations.get("Punjabi", ""),
        ])
    print(f"💾 Saved to data/interaction_log.csv")

def main():
    chosen = choose_languages()
    max_duration = choose_duration()
    audio_file, vol = record(max_duration)
    
    if vol < 50:
        print("\n⚠️ Too quiet — try again, speak louder/closer.")
        return

    print("Transcribing + detecting language...")
    text, lang = transcribe(audio_file)
    src = lang.split('-')[0] if lang else 'auto'
    print(f"\nDetected language: {lang}")
    print(f"You said: {text}\n")

    print("🔊 Playing your voice back...")
    rate, data = read(audio_file)
    sd.play(data, rate)
    sd.wait()

    print("\nTranslations:")
    print("-" * 45)
    translations = {}
    for name, code, sarvam_lang in chosen:
        if code == src:
            translations[name] = text
            continue
        translated = asyncio.run(translate(text, src, code))
        translations[name] = translated
        print(f"  {name:10}: {translated}")
        speak(translated, sarvam_lang, code)

    print("-" * 45)
    log_interaction(audio_file, lang, text, translations)
    print("Done.")

if __name__ == "__main__":
    main()