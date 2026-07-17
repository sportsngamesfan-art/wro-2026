"""Distance and orientation sensors for BhashaSetu.

Stage 1 (bench testing): mock sensors return synthetic readings and print
[MOCK]. Stage 2 (on Pi 5): real sensors read HC-SR04 (gpiozero), VL53L0X
(I2C), and MPU-6050 (I2C).
"""

from __future__ import annotations

import platform
import random
from abc import ABC, abstractmethod
from dataclasses import dataclass

from config import pins
from src.logbook import Logbook

logger = Logbook("SENSORS")

ON_PI = platform.machine() == "aarch64"


@dataclass
class ImuReading:
    """Orientation/acceleration snapshot from the MPU-6050."""

    heading_deg: float
    accel_x: float
    accel_y: float
    accel_z: float


class UltrasonicSensor(ABC):
    @abstractmethod
    def distance_cm(self) -> float:
        """Return the measured distance in centimeters."""


class MockUltrasonicSensor(UltrasonicSensor):
    """Laptop-safe ultrasonic stub returning a plausible synthetic distance."""

    def __init__(self, name: str, default_cm: float = 100.0):
        self.name = name
        self.default_cm = default_cm

    def distance_cm(self) -> float:
        distance = max(2.0, random.gauss(self.default_cm, 15.0))
        logger.log(f"[MOCK] {self.name} ultrasonic distance = {distance:.1f} cm")
        return distance


class RealUltrasonicSensor(UltrasonicSensor):
    """HC-SR04 sensor via gpiozero.DistanceSensor (ECHO through a voltage divider)."""

    def __init__(self, name: str, trigger_pin: int, echo_pin: int):
        from gpiozero import DistanceSensor

        self.name = name
        self._sensor = DistanceSensor(echo=echo_pin, trigger=trigger_pin, max_distance=4.0)

    def distance_cm(self) -> float:
        return self._sensor.distance * 100.0


class TofSensor(ABC):
    @abstractmethod
    def distance_mm(self) -> float:
        """Return the measured distance in millimeters."""


class MockTofSensor(TofSensor):
    """Laptop-safe VL53L0X stub returning a plausible synthetic distance."""

    def distance_mm(self) -> float:
        distance = max(20.0, random.gauss(500.0, 50.0))
        logger.log(f"[MOCK] VL53L0X ToF distance = {distance:.1f} mm")
        return distance


class RealTofSensor(TofSensor):
    """VL53L0X time-of-flight sensor over I2C."""

    def __init__(self):
        import adafruit_vl53l0x  # type: ignore
        import board  # type: ignore

        i2c = board.I2C()
        self._sensor = adafruit_vl53l0x.VL53L0X(i2c, address=pins.TOF_I2C_ADDRESS)

    def distance_mm(self) -> float:
        return float(self._sensor.range)


class ImuSensor(ABC):
    @abstractmethod
    def read(self) -> ImuReading:
        """Return the current orientation/acceleration reading."""


class MockImuSensor(ImuSensor):
    """Laptop-safe MPU-6050 stub that drifts a synthetic heading over time."""

    def __init__(self):
        self._heading = 0.0

    def read(self) -> ImuReading:
        self._heading = (self._heading + random.uniform(-1.0, 1.0)) % 360.0
        reading = ImuReading(
            heading_deg=self._heading,
            accel_x=random.uniform(-0.1, 0.1),
            accel_y=random.uniform(-0.1, 0.1),
            accel_z=9.81 + random.uniform(-0.05, 0.05),
        )
        logger.log(f"[MOCK] IMU heading={reading.heading_deg:.1f} deg")
        return reading


class RealImuSensor(ImuSensor):
    """MPU-6050 IMU over I2C."""

    def __init__(self):
        from mpu6050 import mpu6050  # type: ignore

        self._sensor = mpu6050(pins.IMU_I2C_ADDRESS)

    def read(self) -> ImuReading:
        accel = self._sensor.get_accel_data()
        gyro = self._sensor.get_gyro_data()
        return ImuReading(
            heading_deg=gyro.get("z", 0.0),
            accel_x=accel["x"],
            accel_y=accel["y"],
            accel_z=accel["z"],
        )


class SensorArray:
    """Bundles the three ultrasonic sensors, the ToF sensor, and the IMU."""

    def __init__(self):
        if ON_PI:
            self.front = RealUltrasonicSensor(
                "front", pins.ULTRASONIC_FRONT_TRIGGER, pins.ULTRASONIC_FRONT_ECHO
            )
            self.left = RealUltrasonicSensor(
                "left", pins.ULTRASONIC_LEFT_TRIGGER, pins.ULTRASONIC_LEFT_ECHO
            )
            self.right = RealUltrasonicSensor(
                "right", pins.ULTRASONIC_RIGHT_TRIGGER, pins.ULTRASONIC_RIGHT_ECHO
            )
            self.tof = RealTofSensor()
            self.imu = RealImuSensor()
        else:
            self.front = MockUltrasonicSensor("front")
            self.left = MockUltrasonicSensor("left")
            self.right = MockUltrasonicSensor("right")
            self.tof = MockTofSensor()
            self.imu = MockImuSensor()
        logger.log(f"Sensor array initialized ({'real' if ON_PI else 'mock'} hardware)")

    def read_all(self) -> dict:
        """Poll every sensor once and return a snapshot dict."""
        return {
            "front_cm": self.front.distance_cm(),
            "left_cm": self.left.distance_cm(),
            "right_cm": self.right.distance_cm(),
            "tof_mm": self.tof.distance_mm(),
            "imu": self.imu.read(),
        }
