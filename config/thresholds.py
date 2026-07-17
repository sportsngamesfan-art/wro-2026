"""Centralized tuning parameters for BhashaSetu's six autonomous decisions.

All magic numbers used for navigation, vision, and audio decisions live here
so they can be tuned without touching module logic.
"""

# --- Decision 1: Obstacle Avoidance ---
OBSTACLE_DISTANCE_CM = 30.0
TURN_DURATION_SEC = 0.6
REVERSE_DURATION_SEC = 0.4

# --- Decision 2: Speaker Detection ---
FACE_STABLE_SECONDS = 2.0
SPEAKER_MAX_DISTANCE_M = 1.0
FACE_DETECTION_CONFIDENCE = 0.5

# --- Decision 3: Voice-Activity Detection ---
VAD_ENERGY_THRESHOLD_DB = -40.0
VAD_SAMPLE_RATE_HZ = 16000
VAD_FRAME_DURATION_MS = 30
VAD_SILENCE_TIMEOUT_SEC = 2.0

# --- Decision 4: Novelty Detection ---
NOVELTY_SCORE_THRESHOLD = 0.6

# --- Decision 5: Fatigue Detection ---
FATIGUE_MIN_WPM = 100
FATIGUE_MAX_PAUSE_SEC = 3.0

# --- Decision 6: Return-to-Start ---
RETURN_POSITION_TOLERANCE_M = 0.15
RETURN_HEADING_TOLERANCE_DEG = 5.0

# --- Motion ---
DEFAULT_DRIVE_SPEED = 0.6  # 0.0 - 1.0
DEFAULT_TURN_SPEED = 0.5

# --- Main loop timing ---
MAIN_LOOP_HZ = 10
SENSOR_POLL_INTERVAL_SEC = 1.0 / MAIN_LOOP_HZ
