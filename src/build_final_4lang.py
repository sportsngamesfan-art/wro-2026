# -*- coding: utf-8 -*-
# Builds audio_player.html with 4 languages: Hindi, English, Sanskrit, Tamil.
# Run:  .venv\Scripts\python.exe src\build_final_4lang.py

import csv
import json
import os

CSV_PATH = "data/hindi_english_sanskrit_tamil_phrases.csv"

if not os.path.exists(CSV_PATH):
    print(f"ERROR: {CSV_PATH} not found. Run translate_tamil.py first.")
    raise SystemExit(1)

def slug(english):
    return (
        english.lower()
        .replace(" ", "_")
        .replace("/", "_")
        .replace("'", "")
        .replace(",", "")
    )

all_pairs = []
with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        h = row["hindi_phrase"].strip()
        e = row["english_translation"].strip()
        sa = row.get("sanskrit_translation", "").strip() or e
        ta = row.get("tamil_translation", "").strip() or e
        c = row.get("category", "Other").strip()
        s = slug(e)
        all_pairs.append({"h": h, "e": e, "sa": sa, "ta": ta, "c": c, "s": s})

print(f"Loaded {len(all_pairs)} phrases from {CSV_PATH}")

phrases_js = json.dumps(all_pairs, ensure_ascii=False)

html = r"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BhashaSetu</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: "Nirmala UI", Arial, sans-serif; background: #f0f0f0; max-width: 1200px; margin: 0 auto; padding: 20px; }
  header { background: #1f2a63; color: white; padding: 20px; border-radius: 8px; }
  h1 { margin: 0; font-size: 24px; }
  .toggle { margin: 12px 0 0; }
  .toggle button {
    padding: 10px 18px; margin: 4px 6px 4px 0; cursor: pointer;
    border: 2px solid #666; background: white; border-radius: 6px; font-size: 15px;
  }
  .toggle button.on { background: #f2a516; color: black; font-weight: bold; border-color: #f2a516; }
  .bar { margin: 14px 0; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  input { padding: 10px; font-size: 16px; flex: 1; min-width: 220px; border: 1px solid #ccc; border-radius: 6px; }
  #count { color: #666; font-size: 14px; }
  audio { width: 100%; margin: 10px 0; }
  #nowplaying { min-height: 20px; color: #1f2a63; font-weight: bold; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
  @media (max-width: 800px) { .grid { grid-template-columns: repeat(2, 1fr); } }
  .btn {
    background: #2196F3; color: white; padding: 12px; border: none;
    border-radius: 6px; cursor: pointer; font-family: inherit; text-align: center;
  }
  .btn:hover { background: #0b7dda; }
  .btn.playing { background: #f2a516; color: #1f2a63; }
  .primary { font-size: 16px; font-weight: bold; }
  .secondary { font-size: 12px; color: #eee; margin-top: 3px; }
  .btn.playing .secondary { color: #4a4326; }
</style>
</head>
<body>

<header>
  <h1>🎵 BhashaSetu &middot; भाषा सेतु</h1>
  <div class="toggle">
    <button id="btn-hi" class="on" onclick="setLang('hi')">हिंदी</button>
    <button id="btn-en" onclick="setLang('en')">English</button>
    <button id="btn-sa" onclick="setLang('sa')">संस्कृत</button>
    <button id="btn-ta" onclick="setLang('ta')">தமிழ்</button>
  </div>
</header>

<div class="bar">
  <input id="search" placeholder="Search...">
  <span id="count"></span>
</div>

<div id="nowplaying"></div>
<audio id="player" controls></audio>

<div class="grid" id="grid"></div>

<script>
const PHRASES = __DATA__;
let lang = 'hi';
const player = document.getElementById('player');
const nowPlaying = document.getElementById('nowplaying');

function candidates(p) {
  if (lang === 'hi') return ['audio/hindi_' + p.h.split(' ').join('_') + '.mp3'];
  if (lang === 'sa') return ['audio/sanskrit_' + p.s + '.mp3', 'audio/hindi_' + p.h.split(' ').join('_') + '.mp3'];
  if (lang === 'ta') return ['audio/tamil_' + p.s + '.mp3'];
  return ['audio/' + p.s + '.mp3'];
}

function textFor(p) {
  if (lang === 'hi') return p.h;
  if (lang === 'sa') return p.sa;
  if (lang === 'ta') return p.ta;
  return p.e;
}
function subFor(p) {
  if (lang === 'hi') return p.e;
  if (lang === 'sa') return p.e;
  if (lang === 'ta') return p.e;
  return p.h;
}

let tryQueue = [];
function playPhrase(p, el) {
  document.querySelectorAll('.playing').forEach(b => b.classList.remove('playing'));
  if (el) el.classList.add('playing');
  nowPlaying.textContent = textFor(p);
  tryQueue = candidates(p);
  attemptPlay();
}
function attemptPlay() {
  if (!tryQueue.length) {
    nowPlaying.textContent += '  (audio not found)';
    return;
  }
  player.src = tryQueue.shift();
  player.play().catch(attemptPlay);
}
player.addEventListener('error', attemptPlay);

function setLang(l) {
  lang = l;
  ['hi', 'en', 'sa', 'ta'].forEach(x => {
    document.getElementById('btn-' + x).classList.toggle('on', l === x);
  });
  render();
}

function render() {
  const q = document.getElementById('search').value.trim().toLowerCase();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  let shown = 0;
  PHRASES.forEach(p => {
    if (q &&
        p.h.toLowerCase().indexOf(q) === -1 &&
        p.e.toLowerCase().indexOf(q) === -1 &&
        p.sa.toLowerCase().indexOf(q) === -1 &&
        p.ta.toLowerCase().indexOf(q) === -1) return;
    shown++;
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerHTML = '<div class="primary">' + textFor(p) + '</div><div class="secondary">' + subFor(p) + '</div>';
    btn.onclick = () => playPhrase(p, btn);
    grid.appendChild(btn);
  });
  document.getElementById('count').textContent = shown + ' / ' + PHRASES.length;
}

document.getElementById('search').addEventListener('input', render);
render();
</script>
</body>
</html>
"""

html = html.replace("__DATA__", phrases_js)

with open("audio_player.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Wrote audio_player.html with हिंदी / English / संस्कृत / தமிழ் — done.")
