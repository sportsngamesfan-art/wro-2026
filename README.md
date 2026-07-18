# BhashaSetu (Bridge of Languages)

An autonomous mobile robot that respectfully records endangered language
speakers in their homes.

**Team:** Heritage Hackers (Riaan Laiwala, Ayansh Agarwal, Siddharth Thawani)
**Competition:** WRO Future Innovators 2026 — Junior Category

## Tech Stack

- **Compute:** Raspberry Pi 5 (8GB), Raspberry Pi OS Bookworm
- **Language:** Python 3.11
- **Motor Control:** gpiozero (lgpio backend) — NOT RPi.GPIO
- **Vision:** Picamera2 + OpenCV
- **Audio:** PyAudio + voice-activity detection (VAD)
- **Sensors:** 3× HC-SR04 ultrasonic (front/left/right), 1× VL53L0X ToF, 1× MPU-6050 IMU
- **Display:** 7" official Raspberry Pi capacitive touchscreen
- **Power:** 3S Li-ion battery (11.1V nominal), separate motor/Pi rails

## The Six Autonomous Decisions

| # | Decision | Logic | Action |
|---|----------|-------|--------|
| 1 | Obstacle Avoidance | Distance < 30cm, turn toward clear side | Motors stop, turn, resume |
| 2 | Speaker Detection | Face stable 2s within 1m | Motors stop, greet |
| 3 | Voice-Activity Detection | Energy > -40dB, record | Write WAV |
| 4 | Novelty Detection | Novelty score > 0.6 | Ask repetition |
| 5 | Fatigue Detection | WPM < 100 or pauses > 3s | Suggest rest |
| 6 | Return-to-Start | Recording ends, navigate back via IMU | Execute return path |

See `docs/ARCHITECTURE.md` for how each decision maps to a module and state
machine.

## Repository Structure

```
bhashasetu/
├── README.md
├── .gitignore
├── requirements.txt
├── setup_pi.sh
├── .env.example
├── src/
│   ├── main.py          # Entry point (python -m src.main)
│   ├── audio.py          # Mic capture, VAD, WAV recording
│   ├── vision.py          # Camera capture, face-stability detection
│   ├── motion.py          # Differential-drive motor control
│   ├── sensors.py         # Ultrasonic x3, ToF, IMU
│   ├── navigation.py       # Drive / obstacle-avoidance / return-to-start
│   ├── listening.py        # Orchestrates the six autonomous decisions
│   ├── ui.py            # Touchscreen UI (CLI stub in Stage 1)
│   ├── logbook.py         # Centralized event logging
│   ├── translation.py      # Hindi-English translation + novelty scoring
│   └── database.py        # SQLite session/recording persistence
├── config/
│   ├── pins.py           # All GPIO pin assignments
│   ├── thresholds.py       # All tuning parameters
│   └── metadata_schema.py    # Pydantic schemas for sessions/recordings
├── tests/                # pytest suite (all run against mock hardware)
├── data/
│   ├── test_images/
│   ├── test_audio/
│   ├── hindi_english_phrases.csv
│   └── reference_vocabulary.txt
└── docs/
    ├── ARCHITECTURE.md
    ├── POWER_SAFETY.md
    ├── PI5_SETUP.md
    └── FIELDWORK_ETHICS.md
```

## Coding Principles

1. **Mock First, Real Later** — every hardware module works against mock
   hardware first (laptop-safe, prints `[MOCK]`); real gpiozero/Picamera2/
   PyAudio implementations are selected automatically on Pi 5
   (`platform.machine() == "aarch64"`).
2. **Centralized Configuration** — all GPIO pins live in `config/pins.py`,
   all tuning parameters live in `config/thresholds.py`. Never hardcode
   either in a module.
3. **State Machine Architecture** — navigation and listening are both
   `Enum`-based state machines (see `docs/ARCHITECTURE.md`).
4. **Logging** — all components log through `src/logbook.py` in
   `[COMPONENT] message` format.
5. **GPIO Compatibility** — gpiozero with the lgpio backend on Pi 5, never
   `RPi.GPIO`. See `docs/PI5_SETUP.md` for wiring notes (voltage dividers,
   MIPI/DSI adapter cables).
6. **Power System Isolation** — motors run directly off the battery; the Pi
   has its own regulated, capacitor-buffered rail. See
   `docs/POWER_SAFETY.md`.

## Stage 1: Bench Testing (Weeks 1-6)

All code currently runs on a laptop against mock hardware — no Raspberry Pi
required yet.

```bash
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt   # picamera2/lgpio are skipped off-Pi

python -m src.main                 # runs the full pipeline against mocks
pytest tests/ -v                   # runs the test suite
```

## Team Roles

- **Riaan:** `audio.py`, `vision.py`, `listening.py`, `translation.py`
- **Ayansh:** `motion.py`, `sensors.py`, `config/pins.py`
- **Siddharth:** `logbook.py`, `database.py`, `docs/*`, `metadata_schema.py`

## Stage 2: On Pi 5

See `docs/PI5_SETUP.md` and run `./setup_pi.sh` on a fresh Raspberry Pi OS
Bookworm install. No application code changes are needed — every hardware
module switches from its mock to its real implementation automatically.

## 🚀 Quick Start (Local Testing)

```bash
# Clone & setup
git clone https://github.com/sportsngamesfan-art/wro-2026.git
cd wro-2026
git checkout claude/bhaasetu-robot-setup-q8d043

# Create environment
python -m venv .venv
.venv\Scripts\activate.bat  # Windows
source .venv/bin/activate  # Mac/Linux

# Install & test
pip install -r requirements.txt
python -m src.main          # Run demo
pytest tests/ -v            # Run 14 tests (all should PASS ✅)
```

## 📊 Current Status (Stage 1)

✅ **Complete:**
- 14 pytest tests passing
- Mock hardware working on laptop
- 502 audio files generated (gTTS)
- 700+ Hindi-English phrases in CSV
- Full database schema with Pydantic validation
- All 6 autonomous decisions coded

⏳ **Next (Stage 2 — when Pi arrives):**
- Real hardware integration
- Motor/sensor calibration
- Test with actual Warli elders

## 🎤 Audio Demo

502 MP3 files in `audio/` folder organized by theme:
- Greetings, Storytelling, Characters, Actions
- Language & Culture, Endangered Languages
- Emotions, Warli Culture, BhashaSetu Project

Generated with: gTTS (Google Text-to-Speech)

## 📁 File Structure
src/              # Core modules (mock/real versions)
├── main.py, audio.py, vision.py
├── motion.py, sensors.py, navigation.py
├── listening.py, translation.py, database.py
└── logbook.py
config/           # Centralized config
├── pins.py (GPIO assignments)
├── thresholds.py (Tuning parameters)
└── metadata_schema.py (Database schema)
tests/            # 14 pytest tests
data/
├── hindi_english_phrases_700.csv
├── reference_vocabulary.txt
└── audio/ (502 MP3 files)
docs/
├── ARCHITECTURE.md
├── POWER_SAFETY.md
├── PI5_SETUP.md
└── FIELDWORK_ETHICS.md

## 🧪 Testing

```bash
pytest tests/ -v              # All 14 tests
pytest tests/test_audio_mock.py -v
pytest tests/ --cov=src      # With coverage
```

## 🔌 Critical Pi 5 Notes

- **Voltage Divider Required:** HC-SR04 ECHO needs 1k/2k divider (5V→3.3V)
- **Separate Power Rails:** Motors and Pi must have separate buck converters
- **gpiozero + lgpio:** NOT RPi.GPIO (Pi 5 uses RP1 chip)
- **No PyAudio on Windows:** Sarvam API used instead for audio generation

## 👥 Team Roles

| Person | Responsibility |
|--------|-----------------|
| Riaan | audio.py, vision.py, listening.py, translation.py |
| Ayansh | motion.py, sensors.py, config/pins.py |
| Siddharth | logbook.py, database.py, docs/ |

## 📞 GitHub & Collaboration

**Repository:** https://github.com/sportsngamesfan-art/wro-2026

**Branch:** `claude/bhaasetu-robot-setup-q8d043` (Stage 1 complete)

Each team member:
1. Clone repo
2. Create feature branch: `git checkout -b feature/your-name`
3. Code locally & test: `pytest tests/ -v`
4. Push & make PR
5. After review, merge to main

---

**Made with ❤️ for language preservation**
