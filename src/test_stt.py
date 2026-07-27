# -*- coding: utf-8 -*-
import os
from sarvamai import SarvamAI

key = None
with open('.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('SARVAM_API_KEY'):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")

client = SarvamAI(api_subscription_key=key)

test_file = "audio/hindi_नमस्ते.mp3"
if not os.path.exists(test_file):
    print(f"File not found: {test_file}")
    files = [f for f in os.listdir("audio") if f.endswith(('.mp3','.wav'))][:5]
    print("Sample files available:", files)
    raise SystemExit(1)

print(f"Sending {test_file} to Sarvam...")
try:
    with open(test_file, "rb") as audio:
        response = client.speech_to_text.transcribe(
            file=audio,
            model="saarika:v2.5",
            language_code="hi-IN"
        )
    print("Transcript:", response)
except Exception as e:
    print("FAILED:", e)