# -*- coding: utf-8 -*-
import csv
import json

# Read Sanskrit CSV
all_pairs = []
with open('data/hindi_english_sanskrit_phrases.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        h = row['hindi_phrase'].strip()
        e = row['english_translation'].strip()
        sa = row['sanskrit_translation'].strip()
        c = row.get('category', 'Other').strip()
        s = e.lower().replace(' ', '_').replace('/', '_').replace("'", "")
        all_pairs.append({"h": h, "e": e, "sa": sa, "c": c, "s": s})

print(f"Found {len(all_pairs)} phrases with Sanskrit!")

phrases_js = json.dumps(all_pairs, ensure_ascii=False)

html = r"""<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>BhashaSetu</title>
<style>
body { font-family: Arial; background: #f0f0f0; max-width: 1200px; margin: 0 auto; padding: 20px; }
header { background: #1f2a63; color: white; padding: 20px; }
h1 { margin: 0; }
.toggle { margin: 10px 0 0; }
.toggle button { padding: 8px 16px; margin: 5px 5px 0 0; background: white; border: 2px solid #666; cursor: pointer; border-radius: 4px; }
.toggle button.on { background: #f2a516; font-weight: bold; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
.btn { background: #2196F3; color: white; padding: 12px; border: none; cursor: pointer; border-radius: 6px; }
.btn.playing { background: #f2a516; color: #1f2a63; }
input { padding: 10px; width: 60%; margin: 10px 0; }
audio { width: 100%; margin: 10px 0; }
</style></head><body>

<header>
  <h1>🎵 BhashaSetu - भाषा सेतु</h1>
  <div class="toggle">
    <button id="btn-hi" class="on" onclick="setLang('hi')">हिंदी</button>
    <button id="btn-en" onclick="setLang('en')">English</button>
    <button id="btn-sa" onclick="setLang('sa')">संस्कृत</button>
  </div>
</header>

<input id="search" placeholder="Search..." onkeyup="render()">
<audio id="player" controls></audio>
<div class="grid" id="grid"></div>

<script>
const PHRASES = __DATA__;
let lang = 'hi';

function setLang(l) {
  lang = l;
  document.getElementById('btn-hi').classList.toggle('on', l === 'hi');
  document.getElementById('btn-en').classList.toggle('on', l === 'en');
  document.getElementById('btn-sa').classList.toggle('on', l === 'sa');
  render();
}

function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  PHRASES.forEach(p => {
    if (q && !p.h.toLowerCase().includes(q) && !p.e.toLowerCase().includes(q) && !p.sa.toLowerCase().includes(q)) return;
    const b = document.createElement('button');
    b.className = 'btn';
    const text = lang === 'hi' ? p.h : (lang === 'sa' ? p.sa : p.e);
    const sub = lang === 'hi' ? p.e : (lang === 'sa' ? p.e : p.h);
    b.innerHTML = '<div style="font-size:16px;font-weight:bold;">' + text + '</div><div style="font-size:12px;color:#ddd;">' + sub + '</div>';
    b.onclick = () => {
      document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
      b.classList.add('playing');
      const file = lang === 'hi' ? 'audio/hindi_' + p.h.replace(/ /g, '_') + '.mp3' : (lang === 'sa' ? 'audio/sanskrit_' + p.s + '.mp
      document.getElementById('player').src = file;
      document.getElementById('player').play();
    };
    grid.appendChild(b);
  });
}

render();
</script>
</body></html>
"""

html = html.replace("__DATA__", phrases_js)

with open("audio_player.html", "w", encoding="utf-8") as f:
    f.write(html)

print("✅ Built audio_player.html with REAL Sanskrit translations!")