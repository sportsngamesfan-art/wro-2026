"""Navigation state machine for BhashaSetu.

States: IDLE -> DRIVING -> OBSTACLE_DETECTED -> TURNING -> DRIVING ...
Implements Decision 1 (Obstacle Avoidance) and Decision 6 (Return-to-Start).
"""

from __future__ import annotations

from enum import Enum, auto
from typing import List, Optional

from config import thresholds
from src.logbook import Logbook
from src.motion import Motion
from src.sensors import SensorArray

logger = Logbook("NAVIGATION")


class NavigationState(Enum):
    IDLE = auto()
    DRIVING = auto()
    OBSTACLE_DETECTED = auto()
    TURNING = auto()
    RETURNING = auto()


class Navigator:
    """Drives the robot forward while avoiding obstacles, and can retrace its path home."""

    def __init__(self, motion: Optional[Motion] = None, sensors: Optional[SensorArray] = None):
        self.motion = motion or Motion()
        self.sensors = sensors or SensorArray()
        self.state = NavigationState.IDLE
        self._start_heading: Optional[float] = None
        self._path: List[float] = []

    def _set_state(self, new_state: NavigationState) -> None:
        if new_state != self.state:
            logger.log(f"State: {self.state.name} -> {new_state.name}")
            self.state = new_state

    def start(self) -> None:
        """Transition from IDLE to DRIVING and remember the starting heading."""
        reading = self.sensors.imu.read()
        self._start_heading = reading.heading_deg
        self._path = []
        self._set_state(NavigationState.DRIVING)
        self.motion.forward()

    def step(self) -> NavigationState:
        """Run one control-loop iteration and return the resulting state."""
        if self.state == NavigationState.DRIVING:
            self._drive_step()
        elif self.state == NavigationState.OBSTACLE_DETECTED:
            self._handle_obstacle()
        elif self.state == NavigationState.TURNING:
            self._set_state(NavigationState.DRIVING)
            self.motion.forward()
        elif self.state == NavigationState.RETURNING:
            self._return_step()
        return self.state

    def _drive_step(self) -> None:
        reading = self.sensors.imu.read()
        self._path.append(reading.heading_deg)

        front_cm = self.sensors.front.distance_cm()
        if front_cm < thresholds.OBSTACLE_DISTANCE_CM:
            self._set_state(NavigationState.OBSTACLE_DETECTED)
            self.motion.stop()

    def _handle_obstacle(self) -> None:
        left_cm = self.sensors.left.distance_cm()
        right_cm = self.sensors.right.distance_cm()
        clear_side = "left" if left_cm >= right_cm else "right"
        logger.log(f"Obstacle ahead -- turning toward clearer side: {clear_side}")

        if clear_side == "left":
            self.motion.turn_left()
        else:
            self.motion.turn_right()
        self._set_state(NavigationState.TURNING)

    def begin_return(self) -> None:
        """Trigger Decision 6: navigate back toward the recorded start heading."""
        self._set_state(NavigationState.RETURNING)

    def _return_step(self) -> None:
        if self._start_heading is None:
            self._set_state(NavigationState.IDLE)
            self.motion.stop()
            return

        reading = self.sensors.imu.read()
        heading_error = (self._start_heading - reading.heading_deg + 180) % 360 - 180

        if abs(heading_error) <= thresholds.RETURN_HEADING_TOLERANCE_DEG:
            logger.log("Return heading achieved -- stopping")
            self.motion.stop()
            self._set_state(NavigationState.IDLE)
        elif heading_error > 0:
            self.motion.turn_left()
        else:
            self.motion.turn_right()

    def stop(self) -> None:
        """Immediately stop and return to IDLE."""
        self.motion.stop()
        self._set_state(NavigationState.IDLE)
