# -*- coding: utf-8 -*-
import asyncio, time, os, csv
from datetime import datetime
import numpy as np
import sounddevice as sd
from scipy.io.wavfile import write, read
from sarvamai import SarvamAI
from sarvamai.play import save
from googletrans import Translator

# Load Sarvam API key from .env
key = None
with open('.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('SARVAM_API_KEY'):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")
client = SarvamAI(api_subscription_key=key)

DURATION = 5
SAMPLERATE = 16000

# name, googletrans code, sarvam TTS language code
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
    print("  (Type numbers separated by commas, e.g. 1,3  — or 'all' for everything)")
    choice = input("Your choice: ").strip().lower()
    if choice in ("all", ""):
        return ALL_LANGS
    picked = []
    for part in choice.split(","):
        part = part.strip()
        if part.isdigit():
            idx = int(part) - 1
            if 0 <= idx < len(ALL_LANGS):
                picked.append(ALL_LANGS[idx])
    if not picked:
        print("No valid choice — using all languages.")
        return ALL_LANGS
    return picked

def record():
    os.makedirs("recordings", exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"recordings/{stamp}.wav"
    print("\nGet ready...")
    for n in (3, 2, 1):
        print(f"  {n}...")
        time.sleep(0.7)
    print(f"🎤 SPEAK NOW ({DURATION} seconds)!")
    audio = sd.rec(int(DURATION * SAMPLERATE), samplerate=SAMPLERATE, channels=1, dtype='int16')
    sd.wait()
    write(filename, SAMPLERATE, audio)
    volume = np.abs(audio).mean()
    print(f"✅ Recorded and saved: {filename}  (volume {volume:.0f})")
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
    # Cache: reuse saved audio if we already made it (saves credits)
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
    print(f"💾 Saved to data/interaction_log.csv (voice clip: {audio_file})")

def main():
    chosen = choose_languages()
    audio_file, vol = record()
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