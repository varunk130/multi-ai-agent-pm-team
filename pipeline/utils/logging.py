"""
Structured logging setup for the pipeline using structlog.

Provides a consistent logging interface with agent-aware context.

Built by Varun Kulkarni.
"""

from __future__ import annotations

import logging
import sys
from typing import Any

import structlog


def configure_logging(
    level: str = "INFO",
    format_type: str = "console",
) -> None:
    """
    Configure structlog with the specified level and format.

    Args:
        level: Logging level (DEBUG, INFO, WARNING, ERROR).
        format_type: 'console' for human-readable, 'json' for structured.
    """
    log_level = getattr(logging, level.upper(), logging.INFO)

    if format_type == "json":
        renderer = structlog.processors.JSONRenderer()
    else:
        renderer = structlog.dev.ConsoleRenderer(colors=sys.stderr.isatty())

    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.StackInfoRenderer(),
            structlog.dev.set_exc_info,
            structlog.processors.TimeStamper(fmt="iso"),
            renderer,
        ],
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str = "pipeline", **initial_context: Any) -> structlog.BoundLogger:
    """
    Get a structlog logger bound with initial context.

    Args:
        name: Logger name (typically the module or agent name).
        **initial_context: Additional key-value pairs to bind.
    """
    return structlog.get_logger(name, **initial_context)


class PipelineLogger:
    """Convenience logger with pipeline-specific methods."""

    def __init__(self, agent_name: str = "pipeline") -> None:
        self._log = get_logger(agent_name, agent=agent_name)

    def agent_start(self, agent_number: int) -> None:
        self._log.info("agent_start", agent_number=agent_number)

    def agent_complete(self, agent_number: int, duration_ms: float) -> None:
        self._log.info(
            "agent_complete",
            agent_number=agent_number,
            duration_ms=round(duration_ms, 2),
        )

    def agent_error(self, agent_number: int, error: str) -> None:
        self._log.error("agent_error", agent_number=agent_number, error=error)

    def pipeline_start(self, agent_count: int) -> None:
        self._log.info("pipeline_start", agent_count=agent_count)

    def pipeline_complete(self, total_ms: float, status: str) -> None:
        self._log.info(
            "pipeline_complete",
            total_ms=round(total_ms, 2),
            status=status,
        )
