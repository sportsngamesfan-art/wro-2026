"""Centralized event logging for BhashaSetu.

All components log through `Logbook`/`log_event` instead of calling `print`
directly, so every run produces one consistent, timestamped event stream
regardless of which module emitted it.
"""

from __future__ import annotations

import datetime as dt
from pathlib import Path
from typing import Optional


def log_event(component: str, message: str, log_file: Optional[Path] = None) -> str:
    """Format and print a `[COMPONENT] message` log line, optionally also appending to a file."""
    timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"{timestamp} [{component.upper()}] {message}"
    print(line)

    if log_file is not None:
        log_file.parent.mkdir(parents=True, exist_ok=True)
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(line + "\n")

    return line


class Logbook:
    """Convenience wrapper that binds a component name and optional log file."""

    def __init__(self, component: str, log_file: Optional[Path] = None):
        self.component = component
        self.log_file = log_file

    def log(self, message: str) -> str:
        """Log a message tagged with this logbook's component name."""
        return log_event(self.component, message, self.log_file)
