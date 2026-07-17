# Raspberry Pi 5 Setup

This covers taking BhashaSetu from laptop bench testing (Stage 1) to running
on real Raspberry Pi 5 hardware (Stage 2).

## OS & Python

- Flash **Raspberry Pi OS Bookworm (64-bit)** using Raspberry Pi Imager.
- Bookworm ships with **Python 3.11**, which matches this project's target.
- Enable SSH and Wi-Fi in the Imager's advanced options so the Pi is
  reachable headlessly.

## Run `setup_pi.sh`

From a fresh Bookworm install:

```bash
git clone <this repo>
cd bhashasetu
chmod +x setup_pi.sh
./setup_pi.sh
```

This installs system packages (`python3-picamera2`, `i2c-tools`,
`portaudio19-dev`, etc.), enables the camera and I2C interfaces via
`raspi-config nonint`, and creates a `venv` with `--system-site-packages` so
`picamera2` (which is only reliably installable via apt) is visible inside
the virtualenv.

## GPIO: gpiozero + lgpio (NOT RPi.GPIO)

The Pi 5's GPIO chip is no longer supported by the legacy `RPi.GPIO`
library. This project uses **gpiozero with the lgpio backend** exclusively:

```bash
pip install gpiozero lgpio
```

gpiozero auto-selects `lgpio` as its pin factory on a Pi 5; you can force it
explicitly with:

```bash
export GPIOZERO_PIN_FACTORY=lgpio
```

## HC-SR04 Ultrasonic Sensors

The Pi 5's GPIO pins are **3.3V only** and are not 5V-tolerant. Each
HC-SR04's ECHO pin (which outputs 5V) must go through a **voltage divider
(1kOhm + 2kOhm resistors)** before reaching a Pi 5 GPIO pin:

```
ECHO (5V) --[1kOhm]--+--[2kOhm]--> GND
                       |
                   Pi GPIO (~3.3V)
```

TRIGGER pins can connect directly (the Pi drives them at 3.3V, which
HC-SR04 modules accept as a valid trigger high).

## Camera (Picamera2)

The Pi 5's camera connector is a smaller, 22-pin MIPI connector than
earlier Pi models. A **22-pin-to-15-pin MIPI adapter cable** is required to
connect the standard Raspberry Pi Camera Module to a Pi 5.

## Touchscreen (7in Official Display)

The Pi 5's DSI display connector is likewise a 22-pin connector. A
**15-pin-to-22-pin DSI adapter cable** is required to connect the official
7in capacitive touchscreen.

## I2C Sensors (VL53L0X ToF, MPU-6050 IMU)

Both sensors share the Pi 5's I2C bus (enabled by `setup_pi.sh` via
`raspi-config nonint do_i2c 0`). Verify they're detected with:

```bash
i2cdetect -y 1
```

You should see `0x29` (VL53L0X) and `0x68` (MPU-6050) in the address grid.

## Verifying the Switch from Mock to Real Hardware

Every hardware module in `src/` picks its implementation automatically via
`platform.machine() == "aarch64"` -- no code changes are needed. Run:

```bash
python -m src.main
```

On the Pi 5 you should see log lines without the `[MOCK]` prefix (e.g.
`[MOTION] Real motor driver initialized (gpiozero + lgpio)`).
