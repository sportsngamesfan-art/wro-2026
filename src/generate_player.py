import os

def generate_html_player():
    """Generate HTML with all 502 audio files as buttons"""
    
    # Get all MP3 files
    audio_files = sorted([f[:-4] for f in os.listdir('audio') if f.endswith('.mp3')])
    
    html = """<!DOCTYPE html>
<html>
<head>
    <title>BhashaSetu Audio Player - 502 Phrases</title>
    <style>
        body {
            font-family: Arial;
            max-width: 1200px;
            margin: 30px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container { background: white; padding: 30px; border-radius: 10px; }
        h1 { color: #333; }
        audio { width: 100%; margin: 20px 0; }
        input { width: 100%; padding: 10px; font-size: 16px; margin: 10px 0; }
        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin: 20px 0;
        }
        button {
            background: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: 0.2s;
        }
        button:hover { background: #45a049; transform: scale(1.05); }
        .stats { color: #666; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 BhashaSetu Audio Player</h1>
        <p class="stats">502 Hindi-English phrases for language preservation</p>
        
        <input type="text" id="phraseInput" placeholder="Search or type phrase name">
        <button onclick="playPhrase()" style="background: #2196F3; margin-right: 5px;">▶ Play</button>
        <button onclick="stopAudio()" style="background: #f44336;">⏹ Stop</button>
        
        <audio id="audioPlayer" controls></audio>
        
        <h3>📝 Click any phrase to play:</h3>
        <div class="grid">
"""
    
    # Add button for each audio file
    for filename in audio_files:
        display_name = filename.replace('_', ' ').title()
        html += f'            <button onclick="playFile(\'{filename}\')">{display_name}</button>\n'
    
    html += """        </div>
    </div>

    <script>
        function playPhrase() {
            const input = document.getElementById('phraseInput').value.toLowerCase().trim().replace(/ /g, '_');
            if (input) playFile(input);
        }

        function playFile(phrase) {
            const filepath = `audio/${phrase}.mp3`;
            const player = document.getElementById('audioPlayer');
            player.src = filepath;
            player.play();
            document.getElementById('phraseInput').value = phrase.replace(/_/g, ' ');
        }

        function stopAudio() {
            document.getElementById('audioPlayer').pause();
        }

        document.getElementById('phraseInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') playPhrase();
        });
    </script>
</body>
</html>"""
    
    # Write to file
    with open('audio_player.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Generated audio_player.html with {len(audio_files)} buttons!")

if __name__ == "__main__":
    generate_html_player()