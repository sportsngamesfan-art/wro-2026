# -*- coding: utf-8 -*-
import csv
import json

# Read CSV
phrases = []
with open('data/hindi_english_phrases_master.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        h = row['hindi_phrase'].strip()
        e = row['english_translation'].strip()
        if h and e:
            s = e.lower().replace(' ', '_').replace('/', '_')
            phrases.append({'h': h, 'e': e, 'c': row['category'], 's': s})

print(f"Found {len(phrases)} phrases")

# Embed in HTML
html = '''<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>BhashaSetu</title>
<style>
body { font-family: Arial; background: #f0f0f0; max-width: 1000px; margin: 0 auto; padding: 20px; }
header { background: #1f2a63; color: white; padding: 20px; border-radius: 8px; }
h1 { margin: 0; }
.toggle { margin: 10px 0; }
.toggle button { padding: 8px 16px; margin: 5px; cursor: pointer; border: 2px solid #666; background: white; }
.toggle button.on { background: #f2a516; color: black; font-weight: bold; }
input { width: 100%; padding: 10px; margin: 10px 0; font-size: 16px; }
audio { width: 100%; margin: 10px 0; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
.btn { background: #2196F3; color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; }
.btn:hover { background: #0b7dda; }
.btn.playing { background: #f2a516; }
.hindi { font-size: 16px; font-weight: bold; }
.english { font-size: 12px; color: #ddd; }
</style></head><body>
<header>
<h1>🎵 BhashaSetu - भाषा सेतु</h1>
<div class="toggle">
  <button id="btn-hi" class="on" onclick="setLang('hi')">हिंदी</button>
  <button id="btn-en" onclick="setLang('en')">English</button>
</div>
</header>
<input id="search" placeholder="Search..." onkeyup="filter()">
<audio id="player" controls></audio>
<div class="grid" id="grid"></div>
<script>
const phrases = ''' + json.dumps(phrases, ensure_ascii=False) + ''';
let lang = 'hi';

function setLang(l) {
  lang = l;
  document.getElementById('btn-hi').classList.toggle('on', l === 'hi');
  document.getElementById('btn-en').classList.toggle('on', l === 'en');
  render();
}

function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  phrases.forEach(p => {
    if (q && !(p.h.toLowerCase().includes(q) || p.e.toLowerCase().includes(q))) return;
    const btn = document.createElement('button');
    btn.className = 'btn';
    const primary = lang === 'hi' ? p.h : p.e;
    const secondary = lang === 'hi' ? p.e : p.h;
    btn.innerHTML = '<div class="hindi">' + primary + '</div><div class="english">' + secondary + '</div>';
    btn.onclick = () => {
      const file = lang === 'hi' ? 'audio/hindi_' + p.h.replace(/ /g, '_') + '.mp3' : 'audio/' + p.s + '.mp3';
      document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
      btn.classList.add('playing');
      document.getElementById('player').src = file;
      document.getElementById('player').play();
    };
    grid.appendChild(btn);
  });
}

function filter() { render(); }

render();
</script></body></html>'''

with open('audio_player.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Built audio_player.html with all phrases!")