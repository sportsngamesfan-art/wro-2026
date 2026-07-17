#!/usr/bin/env bash
# Provision a Raspberry Pi 5 (Raspberry Pi OS Bookworm) to run BhashaSetu.
# Stage 2 script -- not needed for laptop bench testing (Stage 1).
set -euo pipefail

echo "[setup_pi] Updating apt and installing system packages..."
sudo apt update
sudo apt install -y \
    python3.11 python3.11-venv python3-pip \
    python3-libcamera python3-picamera2 \
    i2c-tools libatlas-base-dev \
    portaudio19-dev

echo "[setup_pi] Enabling I2C (VL53L0X ToF + MPU-6050 IMU)..."
sudo raspi-config nonint do_i2c 0

echo "[setup_pi] Enabling the camera interface..."
sudo raspi-config nonint do_camera 0

echo "[setup_pi] Creating Python virtual environment..."
python3.11 -m venv --system-site-packages venv
source venv/bin/activate

echo "[setup_pi] Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "[setup_pi] Reminders:"
echo "  - HC-SR04 ECHO pins need a 1kOhm + 2kOhm voltage divider (Pi 5 GPIO is 3.3V only)."
echo "  - The camera needs the 22-pin-to-15-pin MIPI adapter cable for Pi 5."
echo "  - The 7in touchscreen needs the 15-pin DSI adapter cable for Pi 5."
echo "  - gpiozero must use the lgpio backend on Pi 5 (set via GPIOZERO_PIN_FACTORY=lgpio"
echo "    or by having lgpio installed, which is gpiozero's Pi 5 default)."
echo "[setup_pi] Done. Copy .env.example to .env and adjust as needed."
