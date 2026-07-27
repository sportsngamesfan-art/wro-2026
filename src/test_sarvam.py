# -*- coding: utf-8 -*-
import os
from sarvamai import SarvamAI
from sarvamai.play import save

key = None
with open('.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('SARVAM_API_KEY'):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")

if not key:
    print("ERROR: SARVAM_API_KEY not found in .env")
    raise SystemExit(1)

print("Key loaded:", key[:8] + "..." + key[-4:])

client = SarvamAI(api_subscription_key=key)
os.makedirs("audio", exist_ok=True)

tests = [
    ("ନମସ୍କାର", "test_odia_hello"),
    ("ଧନ୍ୟବାଦ", "test_odia_thanks"),
    ("ଶୁଭ ସକାଳ", "test_odia_morning"),
]

for text, name in tests:
    try:
        response = client.text_to_speech.convert(
            text=text,
            target_language_code="od-IN",
            model="bulbul:v3",
            speaker="priya",
        )
        save(response, f"audio/{name}.wav")
        print(f"OK: {name}.wav saved")
    except Exception as e:
        print(f"FAILED: {name}: {e}")

print("\nDone. Check the audio/ folder for 3 test_odia_*.wav files.")