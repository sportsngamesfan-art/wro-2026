import csv

# Read CSV
phrases = []
try:
    with open('data/hindi_english_phrases_700.csv', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines[1:]:  # Skip header
            parts = line.strip().split(',', 1)
            if len(parts) == 2:
                hindi = parts[0].strip()
                english = parts[1].strip()
                if hindi and english:
                    phrases.append((hindi, english))
except Exception as e:
    print(f"Error: {e}")

print(f"Found {len(phrases)} phrases")

# Create HTML
html = '''<!DOCTYPE html>
<html>
<head>
    <title>BhashaSetu Audio Player</title>
    <style>
        body { font-family: Arial; max-width: 1200px; margin: 30px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; }
        audio { width: 100%; margin: 20px 0; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
        .btn { background: #2196F3; color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
        .btn:hover { background: #0b7dda; }
        .hindi { font-size: 16px; font-weight: bold; }
        .english { font-size: 12px; color: #e0e0e0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 BhashaSetu - ''' + str(len(phrases)) + ''' Phrases</h1>
        <audio id="player" controls></audio>
        <div class="grid" id="grid"></div>
    </div>
    <script>
        const phrases = [
'''

# Add phrases
for hindi, english in phrases:
    hindi_escaped = hindi.replace("'", "\\'")
    english_escaped = english.replace("'", "\\'")
    html += f"            {{h: '{hindi_escaped}', e: '{english_escaped}'}},\n"

html += '''        ];

        function display() {
            const grid = document.getElementById('grid');
            phrases.forEach(p => {
                const btn = document.createElement('button');
                btn.className = 'btn';
                btn.innerHTML = `<div class="hindi">${p.h}</div><div class="english">${p.e}</div>`;
                btn.onclick = () => {
                    const file = p.e.toLowerCase().replace(/ /g, '_').replace(/\\//g, '_') + '.mp3';
                    document.getElementById('player').src = 'audio/' + file;
                    document.getElementById('player').play();
                };
                grid.appendChild(btn);
            });
        }
        display();
    </script>
</body>
</html>'''

with open('audio_player.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✅ Created player!")