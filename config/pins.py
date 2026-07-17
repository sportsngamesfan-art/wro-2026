"""Centralized GPIO pin assignments for BhashaSetu (Raspberry Pi 5, BCM numbering).

All hardware modules must import pin numbers from here — never hardcode a pin.
"""

# --- Motor Driver (H-bridge, e.g. TB6612FNG) ---
MOTOR_LEFT_FORWARD = 5
MOTOR_LEFT_BACKWARD = 6
MOTOR_LEFT_ENABLE = 12  # PWM

MOTOR_RIGHT_FORWARD = 13
MOTOR_RIGHT_BACKWARD = 19
MOTOR_RIGHT_ENABLE = 18  # PWM

# --- HC-SR04 Ultrasonic Sensors (x3: front, left, right) ---
# ECHO lines run through a 1kOhm + 2kOhm voltage divider before reaching
# the Pi 5's 3.3V-only GPIO inputs.
ULTRASONIC_FRONT_TRIGGER = 23
ULTRASONIC_FRONT_ECHO = 24

ULTRASONIC_LEFT_TRIGGER = 25
ULTRASONIC_LEFT_ECHO = 8

ULTRASONIC_RIGHT_TRIGGER = 7
ULTRASONIC_RIGHT_ECHO = 1

# --- VL53L0X Time-of-Flight sensor (I2C) ---
TOF_I2C_BUS = 1
TOF_I2C_ADDRESS = 0x29
TOF_SHUTDOWN_PIN = 27

# --- MPU-6050 IMU (I2C) ---
IMU_I2C_BUS = 1
IMU_I2C_ADDRESS = 0x68

# --- Status LED ---
STATUS_LED = 26

# --- Touchscreen ---
# The official 7" capacitive touchscreen connects via the 15-pin DSI adapter
# cable plus I2C for the touch controller; no dedicated GPIO pins required.
