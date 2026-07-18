import pyttsx3
import time

def speak_phrase(phrase):
    """Create fresh engine and speak one phrase"""
    print(f"[COMPUTER] {phrase}")
    time.sleep(0.5)  # Delay before speaking
    
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1.0)
    engine.say(phrase)
    engine.runAndWait()
    del engine
    time.sleep(1)

if __name__ == "__main__":
    time.sleep(2)
    
    print("[YOU] Hello")
    speak_phrase("Namaste")
    
    print("[YOU] Goodbye")
    speak_phrase("Goodbye")
    
    print("[YOU] Thank you")
    speak_phrase("Thank you")
    
    print("[YOU] How are you")
    speak_phrase("I am doing well")
    
    print("[DONE]")