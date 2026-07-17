"""Motor control for BhashaSetu's differential drive base.

Stage 1 (bench testing): MockMotor prints [MOCK] instead of driving GPIO.
Stage 2 (on Pi 5): RealMotor drives an H-bridge via gpiozero (lgpio backend).
"""

from __future__ import annotations

import platform
from abc import ABC, abstractmethod
from typing import Optional

from config import pins, thresholds
from src.logbook import Logbook

logger = Logbook("MOTION")

ON_PI = platform.machine() == "aarch64"


class MotorBase(ABC):
    @abstractmethod
    def drive(self, left_speed: float, right_speed: float) -> None:
        """Set both wheel speeds in [-1.0, 1.0] (negative = reverse)."""

    @abstractmethod
    def stop(self) -> None:
        """Stop both motors immediately."""


class MockMotor(MotorBase):
    """Laptop-safe motor stub that just logs the commands it would send."""

    def __init__(self):
        self.left_speed = 0.0
        self.right_speed = 0.0
        logger.log("[MOCK] Motor driver initialized")

    def drive(self, left_speed: float, right_speed: float) -> None:
        self.left_speed = max(-1.0, min(1.0, left_speed))
        self.right_speed = max(-1.0, min(1.0, right_speed))
        logger.log(f"[MOCK] drive(left={self.left_speed:.2f}, right={self.right_speed:.2f})")

    def stop(self) -> None:
        self.left_speed = 0.0
        self.right_speed = 0.0
        logger.log("[MOCK] stop()")


class RealMotor(MotorBase):
    """Pi 5 motor driver using gpiozero's Motor class with the lgpio backend."""

    def __init__(self):
        from gpiozero import Motor  # imported lazily so laptops without gpiozero still work

        self._left = Motor(
            forward=pins.MOTOR_LEFT_FORWARD,
            backward=pins.MOTOR_LEFT_BACKWARD,
            enable=pins.MOTOR_LEFT_ENABLE,
            pwm=True,
        )
        self._right = Motor(
            forward=pins.MOTOR_RIGHT_FORWARD,
            backward=pins.MOTOR_RIGHT_BACKWARD,
            enable=pins.MOTOR_RIGHT_ENABLE,
            pwm=True,
        )
        logger.log("Real motor driver initialized (gpiozero + lgpio)")

    def drive(self, left_speed: float, right_speed: float) -> None:
        self._set_wheel(self._left, left_speed)
        self._set_wheel(self._right, right_speed)

    @staticmethod
    def _set_wheel(motor, speed: float) -> None:
        speed = max(-1.0, min(1.0, speed))
        if speed > 0:
            motor.forward(speed)
        elif speed < 0:
            motor.backward(-speed)
        else:
            motor.stop()

    def stop(self) -> None:
        self._left.stop()
        self._right.stop()


def get_motor() -> MotorBase:
    """Return the appropriate motor driver for the current platform."""
    return RealMotor() if ON_PI else MockMotor()


class Motion:
    """High-level driving helpers built on top of a MotorBase."""

    def __init__(self, motor: Optional[MotorBase] = None):
        self.motor = motor or get_motor()

    def forward(self, speed: float = thresholds.DEFAULT_DRIVE_SPEED) -> None:
        """Drive straight forward at the given speed."""
        self.motor.drive(speed, speed)

    def reverse(self, speed: float = thresholds.DEFAULT_DRIVE_SPEED) -> None:
        """Drive straight backward at the given speed."""
        self.motor.drive(-speed, -speed)

    def turn_left(self, speed: float = thresholds.DEFAULT_TURN_SPEED) -> None:
        """Pivot left in place."""
        self.motor.drive(-speed, speed)

    def turn_right(self, speed: float = thresholds.DEFAULT_TURN_SPEED) -> None:
        """Pivot right in place."""
        self.motor.drive(speed, -speed)

    def stop(self) -> None:
        """Stop all motion."""
        self.motor.stop()
