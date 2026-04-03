"""
Pipeline orchestrator — sequential execution of all 6 agents.

Manages the agent chain, context accumulation, timing, error handling,
and Rich console output. Supports both synchronous and async execution.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import asyncio
import time
from datetime import datetime, timezone
from typing import Any

import structlog
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn, TimeElapsedColumn
from rich.table import Table

from pipeline.agents.base import BaseAgent
from pipeline.agents.chief_of_staff import ChiefOfStaffAgent
from pipeline.agents.data_scientist import DataScientistAgent
from pipeline.agents.feedback_pipeline import FeedbackPipelineAgent
from pipeline.agents.metrics_narrator import MetricsNarratorAgent
from pipeline.agents.prd_architect import PRDArchitectAgent
from pipeline.agents.stakeholder_translator import StakeholderTranslatorAgent
from pipeline.config import PipelineConfig
from pipeline.models import PipelineResult

logger = structlog.get_logger()

# Default agent instantiation order
AGENT_CLASSES: list[type[BaseAgent]] = [
    FeedbackPipelineAgent,
    DataScientistAgent,
    MetricsNarratorAgent,
    ChiefOfStaffAgent,
    PRDArchitectAgent,
    StakeholderTranslatorAgent,
]


class PipelineOrchestrator:
    """
    Orchestrates the sequential execution of the 6-agent pipeline.

    Each agent receives the full accumulated context from all previous agents.
    Results are collected into a ``PipelineResult`` with timing information.
    """

    def __init__(self, config: PipelineConfig | None = None) -> None:
        self.config = config or PipelineConfig()
        self.console = Console()
        self._agents: list[BaseAgent] = []
        self._results: dict[str, Any] = {}
        self._agent_timings: dict[str, float] = {}
        self._errors: list[str] = []
        self._initialize_agents()

    def _initialize_agents(self) -> None:
        """Instantiate all agents from the class registry."""
        for agent_cls in AGENT_CLASSES:
            agent = agent_cls()
            # Only include if the matching config is enabled
            try:
                cfg = self.config.get_agent(agent.agent_number)
                if cfg.enabled:
                    self._agents.append(agent)
            except ValueError:
                # Agent not in config — include with defaults
                self._agents.append(agent)

    @property
    def agents(self) -> list[BaseAgent]:
        """Return the ordered list of agents."""
        return list(self._agents)

    def _print_header(self) -> None:
        """Print the pipeline execution header."""
        self.console.print()
        self.console.print(
            Panel(
                "[bold cyan]Multi AI Agent PM Team Pipeline[/bold cyan]\n"
                "[dim]Sequential agent orchestration for product management[/dim]\n"
                f"[dim]Agents: {len(self._agents)} | "
                f"Started: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}[/dim]",
                title="🤖 Pipeline Execution",
                border_style="cyan",
            )
        )

    def _print_agent_result(self, agent: BaseAgent, output: Any, duration_ms: float) -> None:
        """Print a summary panel for an agent's result."""
        summary = agent.format_output(output)
        self.console.print(
            Panel(
                f"[bold]{summary}[/bold]\n"
                f"[dim]Duration: {duration_ms:.0f}ms[/dim]",
                title=f"Agent {agent.agent_number}: {agent.name}",
                border_style=agent.color,
            )
        )

    def _print_summary(self, total_ms: float) -> None:
        """Print the final execution summary table."""
        table = Table(title="Pipeline Execution Summary", border_style="green")
        table.add_column("Agent", style="cyan")
        table.add_column("Status", style="green")
        table.add_column("Duration", justify="right")

        for agent in self._agents:
            key = f"agent_{agent.agent_number}"
            status = "✅ Success" if key in self._results else "❌ Failed"
            duration = self._agent_timings.get(key, 0)
            table.add_row(
                f"{agent.agent_number}. {agent.name}",
                status,
                f"{duration:.0f}ms",
            )

        table.add_row("", "", "─" * 10, style="dim")
        table.add_row("[bold]Total[/bold]", "", f"[bold]{total_ms:.0f}ms[/bold]")
        self.console.print()
        self.console.print(table)

    def run(self, verbose: bool = True) -> PipelineResult:
        """
        Execute all agents sequentially with context accumulation.

        Args:
            verbose: If True, print Rich console output during execution.

        Returns:
            PipelineResult with all agent outputs and timing data.
        """
        if verbose:
            self._print_header()

        context: dict[str, Any] = {}
        start_total = time.perf_counter()

        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            TimeElapsedColumn(),
            console=self.console,
            disable=not verbose,
        ) as progress:
            for agent in self._agents:
                task_id = progress.add_task(
                    f"Running Agent {agent.agent_number}: {agent.name}...",
                    total=None,
                )

                try:
                    start_agent = time.perf_counter()
                    output = agent.run(context)
                    duration_ms = (time.perf_counter() - start_agent) * 1000

                    key = f"agent_{agent.agent_number}"
                    context[key] = output
                    self._results[key] = output
                    self._agent_timings[key] = duration_ms

                    progress.update(task_id, completed=True)
                    if verbose:
                        self._print_agent_result(agent, output, duration_ms)

                except Exception as exc:
                    duration_ms = (time.perf_counter() - start_agent) * 1000
                    key = f"agent_{agent.agent_number}"
                    self._agent_timings[key] = duration_ms
                    error_msg = f"Agent {agent.agent_number} ({agent.name}) failed: {exc}"
                    self._errors.append(error_msg)
                    logger.error("agent_failed", agent=agent.name, error=str(exc))

                    if verbose:
                        self.console.print(
                            f"  [red]✗ {agent.name} failed: {exc}[/red]"
                        )

        total_ms = (time.perf_counter() - start_total) * 1000

        if verbose:
            self._print_summary(total_ms)

        status = "success" if not self._errors else ("partial" if self._results else "failed")

        return PipelineResult(
            agent_outputs={k: v.model_dump() for k, v in self._results.items()},
            total_duration_ms=round(total_ms, 2),
            timestamp=datetime.now(timezone.utc).isoformat(),
            status=status,
            errors=self._errors,
        )

    async def run_async(self, verbose: bool = True) -> PipelineResult:
        """
        Async wrapper around the synchronous pipeline run.

        The agents themselves are CPU-bound (no I/O), so this runs the
        synchronous pipeline in a thread executor to avoid blocking the
        event loop.
        """
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.run, verbose)

    def get_agent_output(self, agent_number: int) -> Any:
        """Retrieve the output for a specific agent after a run."""
        key = f"agent_{agent_number}"
        return self._results.get(key)

    def reset(self) -> None:
        """Reset the orchestrator for a fresh run."""
        self._results.clear()
        self._agent_timings.clear()
        self._errors.clear()
