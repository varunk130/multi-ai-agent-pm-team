#!/usr/bin/env python3
"""
Run the full Multi AI Agent PM Team pipeline.

Standalone script that executes all 6 agents sequentially with Rich output.
All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Ensure the project root is on sys.path for local development
project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from rich.console import Console

from pipeline.config import PipelineConfig
from pipeline.orchestrator import PipelineOrchestrator
from pipeline.utils.logging import configure_logging


def main() -> None:
    """Execute the pipeline and display results."""
    console = Console()
    configure_logging(level="INFO")

    console.print("[bold cyan]Multi AI Agent PM Team — Pipeline Runner[/bold cyan]")
    console.print("[dim]All data is 100% synthetic. Built by Varun Kulkarni.[/dim]\n")

    config = PipelineConfig()
    orchestrator = PipelineOrchestrator(config)

    result = orchestrator.run(verbose=True)

    console.print(f"\n[bold]Pipeline Status:[/bold] {result.status}")
    console.print(f"[bold]Total Duration:[/bold] {result.total_duration_ms:.0f}ms")
    console.print(f"[bold]Agents Run:[/bold] {len(result.agent_outputs)}/6")

    if result.errors:
        console.print("\n[red]Errors:[/red]")
        for err in result.errors:
            console.print(f"  • {err}")

    console.print("\n[green]Pipeline execution complete.[/green]")


if __name__ == "__main__":
    main()
