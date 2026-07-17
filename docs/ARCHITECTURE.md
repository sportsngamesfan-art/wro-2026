# BhashaSetu Architecture

## Overview

BhashaSetu is an autonomous mobile robot that drives through a home,
finds a speaker, and records short utterances of an endangered language for
preservation and later translation review. It runs on a Raspberry Pi 5 in
the field, but every module is written "mock first" so the full pipeline can
be developed and tested on a laptop before any hardware is involved.

## Module Layout

```
src/
├── main.py         # Entry point; wires every module together for a demo/run
├── audio.py         # Microphone capture, VAD, WAV recording (Decision 3)
├── vision.py         # Camera capture, face detection/stability (Decision 2)
├── motion.py         # Low-level differential-drive motor control
├── sensors.py         # Ultrasonic x3, VL53L0X ToF, MPU-6050 IMU
├── navigation.py      # Drive/obstacle-avoidance state machine (Decisions 1, 6)
├── listening.py      # Orchestrates the six autonomous decisions
├── ui.py           # 7in touchscreen UI (CLI stub in Stage 1)
├── logbook.py         # Centralized `[COMPONENT] message` event logging
├── translation.py      # Hindi-English dictionary translation + novelty scoring
└── database.py        # SQLite persistence for sessions and recordings
```

Every hardware-facing module (`motion.py`, `sensors.py`, `vision.py`,
`audio.py`) exposes a `*Base` abstract interface with a `Mock*`
implementation (laptop-safe, prints `[MOCK]`) and a `Real*` implementation
(Pi 5 hardware via gpiozero/Picamera2/PyAudio). A `get_*()` factory function
picks the right one based on `platform.machine() == "aarch64"`, so calling
code never branches on platform itself.

## State Machines

### Navigation (`src/navigation.py`)

```
IDLE -> DRIVING -> OBSTACLE_DETECTED -> TURNING -> DRIVING -> ...
                                                       |
                                                  RETURNING -> IDLE
```

- **DRIVING**: moving forward, polling the front ultrasonic sensor.
- **OBSTACLE_DETECTED**: front distance < `OBSTACLE_DISTANCE_CM`; compares
  left/right ultrasonic readings to pick the clearer side.
- **TURNING**: pivoting toward the clear side, then returns to DRIVING.
- **RETURNING**: Decision 6 -- steers by IMU heading back toward the
  heading recorded when the session started.

### Listening (`src/listening.py`)

```
SEARCHING -> GREETING -> RECORDING -> ASKING_REPETITION
                              |              |
                              +--------------+
                              v
                       SUGGESTING_REST -> RETURNING_HOME
```

`ListeningSession` wires `Navigator`, `FaceTracker`, `Recorder`, and
`Database` together to run the six autonomous decisions described in the
project README.

## The Six Autonomous Decisions

| # | Decision | Module | Logic |
|---|----------|--------|-------|
| 1 | Obstacle Avoidance | `navigation.py` | front distance < `OBSTACLE_DISTANCE_CM` |
| 2 | Speaker Detection | `vision.py` | face stable >= `FACE_STABLE_SECONDS` |
| 3 | Voice-Activity Detection | `audio.py` | frame energy > `VAD_ENERGY_THRESHOLD_DB` |
| 4 | Novelty Detection | `translation.py` | novelty score > `NOVELTY_SCORE_THRESHOLD` |
| 5 | Fatigue Detection | `listening.py` | wpm < `FATIGUE_MIN_WPM` or pause > `FATIGUE_MAX_PAUSE_SEC` |
| 6 | Return-to-Start | `navigation.py` | IMU heading within `RETURN_HEADING_TOLERANCE_DEG` of start |

All thresholds live in `config/thresholds.py`; all GPIO pin numbers live in
`config/pins.py`.

## Data Flow

1. `navigation.py` drives the robot and avoids obstacles until `vision.py`
   confirms a stable speaker (Decision 2).
2. `audio.py` records a voiced utterance to `data/test_audio/*.wav`
   (Decision 3).
3. `translation.py` looks up/estimates a translation and novelty score
   against `data/hindi_english_phrases.csv` and
   `data/reference_vocabulary.txt` (Decision 4).
4. `database.py` persists session and recording metadata (validated by
   `config/metadata_schema.py`) to a local SQLite database.
5. `navigation.py` retraces the path home via the IMU (Decision 6).
6. `ui.py` and `logbook.py` surface status to the touchscreen/console
   throughout.

## Stage 1 vs. Stage 2

- **Stage 1 (Weeks 1-6, bench testing)**: every hardware module runs its
  `Mock*` implementation. `python -m src.main` exercises the full pipeline
  on a laptop with no Pi required.
- **Stage 2 (on Pi 5)**: the same code automatically switches to `Real*`
  implementations once running on `aarch64`, per `setup_pi.sh` and
  `docs/PI5_SETUP.md`.
