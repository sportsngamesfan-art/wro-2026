"""Camera and face-detection logic for BhashaSetu.

Stage 1 (bench testing): MockCamera yields blank synthetic frames.
Stage 2 (on Pi 5): RealCamera wraps Picamera2; both feed the same OpenCV
Haar-cascade face detector used for Decision 2 (Speaker Detection).
"""

from __future__ import annotations

import platform
import time
from abc import ABC, abstractmethod
from typing import List, Optional, Tuple

import cv2
import numpy as np

from config import thresholds
from src.logbook import Logbook

logger = Logbook("VISION")

ON_PI = platform.machine() == "aarch64"


class CameraBase(ABC):
    @abstractmethod
    def capture_frame(self) -> np.ndarray:
        """Capture and return a single BGR frame."""

    @abstractmethod
    def close(self) -> None:
        """Release camera resources."""


class MockCamera(CameraBase):
    """Laptop-safe camera stub that synthesizes a blank frame."""

    def __init__(self, width: int = 640, height: int = 480):
        self.width = width
        self.height = height
        logger.log("[MOCK] Camera initialized (synthetic frames)")

    def capture_frame(self) -> np.ndarray:
        frame = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        logger.log("[MOCK] Captured synthetic frame")
        return frame

    def close(self) -> None:
        logger.log("[MOCK] Camera closed")


class RealCamera(CameraBase):
    """Pi 5 camera via Picamera2 (requires 22-pin MIPI adapter cable)."""

    def __init__(self, width: int = 640, height: int = 480):
        from picamera2 import Picamera2

        self._picam2 = Picamera2()
        config = self._picam2.create_preview_configuration(
            main={"size": (width, height), "format": "RGB888"}
        )
        self._picam2.configure(config)
        self._picam2.start()
        logger.log("Real camera initialized (Picamera2)")

    def capture_frame(self) -> np.ndarray:
        return self._picam2.capture_array()

    def close(self) -> None:
        self._picam2.stop()
        logger.log("Camera closed")


def get_camera() -> CameraBase:
    """Return the appropriate camera implementation for the current platform."""
    return RealCamera() if ON_PI else MockCamera()


class FaceTracker:
    """Tracks whether a face has been stably visible for Decision 2 (Speaker Detection)."""

    def __init__(self):
        self._cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )
        self._stable_since: Optional[float] = None

    def detect_faces(self, frame: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """Return bounding boxes (x, y, w, h) of faces detected in the frame."""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self._cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
        return [tuple(box) for box in faces]

    def is_speaker_stable(self, frame: np.ndarray) -> bool:
        """Return True once a face has been continuously visible for FACE_STABLE_SECONDS."""
        faces = self.detect_faces(frame)
        now = time.monotonic()

        if not faces:
            self._stable_since = None
            return False

        if self._stable_since is None:
            self._stable_since = now
            return False

        stable_duration = now - self._stable_since
        if stable_duration >= thresholds.FACE_STABLE_SECONDS:
            logger.log(f"Speaker stable for {stable_duration:.1f}s -- Decision 2 triggered")
            return True
        return False
