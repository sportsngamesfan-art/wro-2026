import requests
import os
from dotenv import load_dotenv

load_dotenv()
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

def speak_sarvam(text):
    print(f"[SARVAM] {text}")
    
    try:
        response = requests.post(
            "https://api.sarvam.ai/text-to-speech",
            json={"text": text, "language": "hi"},
            headers={"Authorization": f"Bearer {SARVAM_API_KEY}"}
        )
        
        if response.status_code == 200:
            # Save audio file
            with open("output.wav", "wb") as f:
                f.write(response.content)
            print("[SUCCESS] Audio saved!")
            return True
        else:
            print(f"[ERROR] {response.status_code}: {response.text}")
            
    except Exception as e:
        print(f"[ERROR] {e}")

if __name__ == "__main__":
    speak_sarvam("Namaste")
    speak_sarvam("Hello")