"""
Abstract base class for all pipeline agents.

Provides common structure — logging, timing, context accumulation — that
every agent in the sequential pipeline inherits.

Built by Varun Kulkarni.
"""

from __future__ import annotations

import time
from abc import ABC, abstractmethod
from functools import wraps
from typing import Any

import structlog

from pipeline.config import AgentConfig


def timed(func):  # noqa: ANN001, ANN201
    """Decorator that measures execution time in milliseconds."""

    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        if hasattr(result, "processing_time_ms"):
            result.processing_time_ms = round(elapsed_ms, 2)
        return result

    @wraps(func)
    async def async_wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        if hasattr(result, "processing_time_ms"):
            result.processing_time_ms = round(elapsed_ms, 2)
        return result

    import asyncio

    if asyncio.iscoroutinefunction(func):
        return async_wrapper
    return wrapper


class BaseAgent(ABC):
    """
    Abstract base class for every agent in the pipeline.

    Each agent receives the accumulated context from all upstream agents
    and produces a strongly-typed output that feeds into the next agent.
    """

    def __init__(self, config: AgentConfig | None = None) -> None:
        self._config = config
        self._logger = structlog.get_logger(agent=self.name)
        self._execution_time_ms: float = 0.0

    # ---- Identity properties (overridden by subclasses) ----

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable agent name."""

    @property
    @abstractmethod
    def agent_number(self) -> int:
        """1-based position in the pipeline."""

    @property
    @abstractmethod
    def cognitive_function(self) -> str:
        """The cognitive function this agent performs."""

    @property
    def color(self) -> str:
        """Display color for Rich console output."""
        return "#ffffff"

    @property
    def description(self) -> str:
        """Short description of this agent's purpose."""
        return ""

    # ---- Core interface ----

    @abstractmethod
    def process(self, context: dict[str, Any]) -> Any:
        """
        Run the agent's core logic.

        Args:
            context: Dictionary of all upstream agent outputs keyed by
                     ``agent_N`` where N is the agent number.

        Returns:
            A Pydantic model matching this agent's output contract.
        """

    def validate_input(self, context: dict[str, Any]) -> bool:
        """Validate that required upstream outputs are present."""
        required = self.required_upstream_agents
        for agent_key in required:
            if agent_key not in context:
                self._logger.warning(
                    "missing_upstream_output",
                    agent=self.name,
                    missing=agent_key,
                )
                return False
        return True

    @property
    def required_upstream_agents(self) -> list[str]:
        """List of ``agent_N`` keys this agent requires in context."""
        return [f"agent_{i}" for i in range(1, self.agent_number)]

    def format_output(self, output: Any) -> str:
        """Return a human-readable summary of the agent output."""
        if hasattr(output, "model_dump"):
            data = output.model_dump()
            summary = data.get("summary", data.get("executive_summary", ""))
            return f"[{self.name}] {summary[:200]}"
        return str(output)[:200]

    # ---- Execution wrapper ----

    def run(self, context: dict[str, Any]) -> Any:
        """Execute the agent with logging and timing."""
        self._logger.info("agent_start", agent=self.name, number=self.agent_number)
        start = time.perf_counter()

        if not self.validate_input(context):
            self._logger.error("validation_failed", agent=self.name)
            raise ValueError(f"Input validation failed for {self.name}")

        result = self.process(context)
        self._execution_time_ms = (time.perf_counter() - start) * 1000

        if hasattr(result, "processing_time_ms"):
            result.processing_time_ms = round(self._execution_time_ms, 2)

        self._logger.info(
            "agent_complete",
            agent=self.name,
            duration_ms=round(self._execution_time_ms, 2),
        )
        return result
