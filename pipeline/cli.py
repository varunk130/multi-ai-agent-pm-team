"""
CLI interface for the Multi AI Agent PM Team pipeline.

Provides commands to run the pipeline, list agents, and inspect data.
Built with Click and Rich for a polished terminal experience.

Built by Varun Kulkarni.
"""

from __future__ import annotations

import json

import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from pipeline import __version__
from pipeline.config import PipelineConfig
from pipeline.data.feedback_data import get_feedback_summary
from pipeline.data.metrics_data import compute_trend_analysis
from pipeline.orchestrator import PipelineOrchestrator

console = Console()


@click.group()
@click.version_option(version=__version__, prog_name="pipeline")
def main() -> None:
    """Multi AI Agent PM Team — sequential pipeline orchestration CLI."""


@main.command()
@click.option("--verbose/--quiet", default=True, help="Show detailed output.")
@click.option("--output", "-o", type=click.Path(), default=None, help="Write JSON output to file.")
def run(verbose: bool, output: str | None) -> None:
    """Execute the full 6-agent pipeline."""
    config = PipelineConfig()
    orchestrator = PipelineOrchestrator(config)
    result = orchestrator.run(verbose=verbose)

    if output:
        with open(output, "w") as f:
            json.dump(result.model_dump(), f, indent=2, default=str)
        console.print(f"\n[green]Results written to {output}[/green]")

    status_color = {"success": "green", "partial": "yellow", "failed": "red"}
    color = status_color.get(result.status, "white")
    console.print(f"\n[{color}]Pipeline finished: {result.status}[/{color}]")


@main.command(name="agents")
def list_agents() -> None:
    """List all pipeline agents and their configurations."""
    config = PipelineConfig()
    table = Table(title="Pipeline Agents", border_style="cyan")
    table.add_column("#", style="bold", width=3)
    table.add_column("Name", style="cyan")
    table.add_column("Cognitive Function", style="green")
    table.add_column("Color")
    table.add_column("Enabled", justify="center")

    for agent in config.agents:
        table.add_row(
            str(agent.number),
            agent.name,
            agent.cognitive_function,
            f"[{agent.color}]██[/{agent.color}] {agent.color}",
            "✅" if agent.enabled else "❌",
        )

    console.print(table)


@main.command()
@click.argument("number", type=int)
def agent(number: int) -> None:
    """Show details for a specific agent by number (1–6)."""
    config = PipelineConfig()
    try:
        a = config.get_agent(number)
    except ValueError:
        console.print(f"[red]No agent with number {number}. Use 1–6.[/red]")
        raise SystemExit(1)

    console.print(
        Panel(
            f"[bold cyan]{a.name}[/bold cyan]\n"
            f"[dim]Cognitive Function:[/dim] {a.cognitive_function}\n"
            f"[dim]Color:[/dim] [{a.color}]██[/{a.color}] {a.color}\n"
            f"[dim]Model:[/dim] {a.model.provider} / {a.model.model_id}\n"
            f"[dim]Enabled:[/dim] {'Yes' if a.enabled else 'No'}\n\n"
            f"{a.description}",
            title=f"Agent {a.number}",
            border_style=a.color,
        )
    )


@main.command()
def data() -> None:
    """Show summary statistics for the synthetic input data."""
    feedback = get_feedback_summary()
    trends = compute_trend_analysis()

    console.print(Panel("[bold]Synthetic Feedback Data Summary[/bold]", border_style="blue"))

    table = Table(border_style="blue")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", justify="right")
    table.add_row("Total Tickets", str(feedback["total_tickets"]))
    table.add_row("Total ARR at Risk", f"${feedback['total_arr_at_risk']:,}")
    table.add_row("Average ARR", f"${feedback['average_arr']:,}")
    table.add_row("Weighted Avg Severity", str(feedback["weighted_avg_severity"]))

    for sev, count in feedback["severity_distribution"].items():
        table.add_row(f"  {sev}", str(count))
    console.print(table)

    console.print(Panel("[bold]Product Metrics Trends[/bold]", border_style="magenta"))
    console.print(f"  Period: {trends['period']}")
    console.print(f"  Overall Health: [red]{trends['overall_health']}[/red]")
    console.print(f"  Alert Level: [yellow]{trends['alert_level']}[/yellow]")

    metrics_table = Table(border_style="magenta")
    metrics_table.add_column("Metric", style="cyan")
    metrics_table.add_column("Start", justify="right")
    metrics_table.add_column("End", justify="right")
    metrics_table.add_column("Change", justify="right")

    for key in ["nps", "churn_rate", "support_tickets", "csat", "mrr"]:
        t = trends[key]
        change_str = f"{t['change']}%"
        color = "red" if "worsening" in str(t.get("direction", "")) or "declining" in str(t.get("direction", "")) else "green"
        metrics_table.add_row(
            key.replace("_", " ").title(),
            str(t["start"]),
            str(t["end"]),
            f"[{color}]{change_str}[/{color}]",
        )
    console.print(metrics_table)


@main.command()
def version() -> None:
    """Show pipeline version information."""
    console.print(f"[bold cyan]Multi AI Agent PM Team Pipeline[/bold cyan]  v{__version__}")
    console.print("[dim]Built by Varun Kulkarni[/dim]")
    console.print("[dim]Works with Claude Code and GitHub Copilot[/dim]")


if __name__ == "__main__":
    main()
