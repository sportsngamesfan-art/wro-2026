import csv

stories = [
    # Story 1: The Old Woman's Language
    ("एक बार की बात है", "Once upon a time"),
    ("एक बुजुर्ग महिला रहती थी", "An elderly woman lived"),
    ("वह बहुत समझदार थी", "She was very wise"),
    ("वह अपनी भाषा बहुत प्रेम करती थी", "She loved her language deeply"),
    ("उसकी कहानियाँ सुंदर थी", "Her stories were beautiful"),
    ("लेकिन कोई सुनने वाला नहीं था", "But no one was listening"),
    ("उसकी भाषा विलुप्त हो रही थी", "Her language was disappearing"),
    ("एक दिन एक रोबोट आया", "One day a robot came"),
    ("रोबोट का नाम भाषा सेतु था", "The robot's name was BhashaSetu"),
    ("यह रोबोट भाषा संरक्षण के लिए था", "It was for language preservation"),
    ("बुजुर्ग महिला खुश हुई", "The elderly woman was happy"),
    ("उसकी कहानियाँ अब सुरक्षित थी", "Her stories were now safe"),
    
    # Story 2: Language Bridge
    ("भाषा एक सेतु है", "Language is a bridge"),
    ("यह दो दिलों को जोड़ता है", "It connects two hearts"),
    ("भारत में 270 भाषाएँ हैं", "India has 270 languages"),
    ("लेकिन कई विलुप्त हो रही हैं", "But many are disappearing"),
    ("हमें उन्हें बचाना चाहिए", "We must save them"),
    ("परंपरा हमारी संपत्ति है", "Tradition is our wealth"),
    ("संस्कृति हमारी पहचान है", "Culture is our identity"),
    ("भाषा संरक्षण महत्वपूर्ण है", "Language preservation is important"),
    
    # Story 3: The Warli Community
    ("वारली एक आदिवासी समुदाय है", "Warli is a tribal community"),
    ("वे अपनी भाषा बोलते हैं", "They speak their language"),
    ("उनकी कला बहुत सुंदर है", "Their art is very beautiful"),
    ("वे अपनी परंपरा को जीवित रखते हैं", "They keep their tradition alive"),
    ("हमें उनसे सीखना चाहिए", "We should learn from them"),
    ("भाषा ज्ञान की कुंजी है", "Language is key to knowledge"),
    ("हर भाषा अद्वितीय है", "Every language is unique"),
    ("हर भाषा का महत्व है", "Every language has value"),
]

# Read existing CSV
existing_phrases = []
try:
    with open('data/hindi_english_phrases_700.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            existing_phrases.append(row)
except:
    existing_phrases = []

# Add story phrases
for hindi, english in stories:
    existing_phrases.append({
        'hindi_phrase': hindi,
        'english_translation': english
    })

# Write back to CSV
with open('data/hindi_english_phrases_700.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['hindi_phrase', 'english_translation'])
    writer.writeheader()
    writer.writerows(existing_phrases)

print(f"✅ Added stories! Total phrases: {len(existing_phrases)}")