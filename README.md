# BhashaSetu (Bridge of Languages)

An autonomous mobile robot that respectfully records endangered language speakers in their homes.

**Team:** Heritage Hackers (Riaan Laiwala, Ayansh Agarwal, Siddharth Thawani)
**Competition:** WRO Future Innovators 2026 — Junior Category

## Tech Stack

- **Compute:** Raspberry Pi 5 (8GB), Raspberry Pi OS Bookworm
- **Language:** Python 3.11
- **Motor Control:** gpiozero (lgpio backend)
- **Vision:** Picamera2 + OpenCV
- **Audio:** PyAudio + voice-activity detection (VAD)
- **Sensors:** 3× HC-SR04 ultrasonic (front/left/right), 1× VL53L0X ToF, 1× MPU-6050 IMU
- **Display:** 7" official Raspberry Pi capacitive touchscreen
- **Power:** 3S Li-ion battery (11.1V nominal), separate motor/Pi rails

## Repository Structure

```
src/
  motor_control/   # gpiozero-based drive control
  vision/           # Picamera2 + OpenCV
  audio/            # PyAudio capture + VAD
  sensors/          # HC-SR04, VL53L0X, MPU-6050 drivers
  display/          # touchscreen UI
tests/
docs/
```

## Setup

```bash
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
