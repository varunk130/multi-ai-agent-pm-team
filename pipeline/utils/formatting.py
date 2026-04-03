"""
Formatting utilities for Rich console output and data presentation.

Built by Varun Kulkarni.
"""

from __future__ import annotations

import math
from typing import Sequence


def format_currency(amount: int | float, decimals: int = 0) -> str:
    """Format a number as USD currency. E.g. 2500000 → '$2,500,000'."""
    if decimals > 0:
        return f"${amount:,.{decimals}f}"
    return f"${int(amount):,}"


def format_percentage(value: float, decimals: int = 1) -> str:
    """Format a number as a percentage. E.g. 3.8 → '3.8%'."""
    return f"{value:.{decimals}f}%"


def format_duration(seconds: float) -> str:
    """
    Format a duration in seconds to a human-readable string.

    Examples:
        0.045  → '45ms'
        1.234  → '1.23s'
        65.0   → '1m 5s'
        3661.0 → '1h 1m 1s'
    """
    if seconds < 0:
        return "0ms"
    if seconds < 1:
        return f"{seconds * 1000:.0f}ms"
    if seconds < 60:
        return f"{seconds:.2f}s"
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    if minutes < 60:
        return f"{minutes}m {secs}s"
    hours = minutes // 60
    mins = minutes % 60
    return f"{hours}h {mins}m {secs}s"


def truncate_text(text: str, max_length: int = 200, suffix: str = "…") -> str:
    """Truncate text to ``max_length`` characters, appending ``suffix`` if trimmed."""
    if len(text) <= max_length:
        return text
    return text[: max_length - len(suffix)] + suffix


def create_severity_badge(severity: str) -> str:
    """Return a Rich-markup severity badge string."""
    colors = {
        "critical": "bold white on red",
        "high": "bold white on dark_orange",
        "medium": "bold black on yellow",
        "low": "bold black on green",
    }
    style = colors.get(severity.lower(), "dim")
    label = severity.upper()
    return f"[{style}] {label} [/{style}]"


def format_table(headers: Sequence[str], rows: Sequence[Sequence[str]]) -> str:
    """
    Format data as a simple ASCII table string.

    Useful for plain-text output when Rich is not available.
    """
    if not headers:
        return ""

    col_widths = [len(h) for h in headers]
    for row in rows:
        for i, cell in enumerate(row):
            if i < len(col_widths):
                col_widths[i] = max(col_widths[i], len(str(cell)))

    sep = "+-" + "-+-".join("-" * w for w in col_widths) + "-+"
    header_row = "| " + " | ".join(h.ljust(w) for h, w in zip(headers, col_widths)) + " |"

    lines = [sep, header_row, sep]
    for row in rows:
        cells = []
        for i, w in enumerate(col_widths):
            cell = str(row[i]) if i < len(row) else ""
            cells.append(cell.ljust(w))
        lines.append("| " + " | ".join(cells) + " |")
    lines.append(sep)
    return "\n".join(lines)


def severity_to_number(severity: str) -> int:
    """Convert severity string to a numeric value for sorting."""
    mapping = {"critical": 4, "high": 3, "medium": 2, "low": 1}
    return mapping.get(severity.lower(), 0)


def format_correlation(r: float) -> str:
    """Format a correlation coefficient with strength label."""
    strength = "strong" if abs(r) > 0.7 else "moderate" if abs(r) > 0.4 else "weak"
    direction = "positive" if r > 0 else "negative"
    return f"{r:+.3f} ({strength} {direction})"
