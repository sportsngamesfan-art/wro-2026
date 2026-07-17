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
