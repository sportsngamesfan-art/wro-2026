"""Touchscreen UI for BhashaSetu.

Stage 1 (bench testing) targets a headless/CLI stub: it prints what would be
shown on the 7" touchscreen instead of rendering real widgets. A real UI
framework can implement the same ScreenBase interface later without changing
callers.
"""

from __future__ import annotations

from abc import ABC, abstractmethod

from src.logbook import Logbook

logger = Logbook("UI")


class ScreenBase(ABC):
    @abstractmethod
    def show_message(self, title: str, body: str = "") -> None:
        """Display a message screen."""

    @abstractmethod
    def show_status(self, status: dict) -> None:
        """Display a status/telemetry screen."""


class CliScreen(ScreenBase):
    """Headless CLI stand-in for the 7" capacitive touchscreen."""

    def show_message(self, title: str, body: str = "") -> None:
        logger.log(f"[MOCK] SCREEN: {title}" + (f" -- {body}" if body else ""))

    def show_status(self, status: dict) -> None:
        rendered = ", ".join(f"{key}={value}" for key, value in status.items())
        logger.log(f"[MOCK] STATUS: {rendered}")


def get_screen() -> ScreenBase:
    """Return the active screen implementation (CLI stub for Stage 1)."""
    return CliScreen()
