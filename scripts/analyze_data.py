#!/usr/bin/env python3
"""
Analyze the synthetic data and print summary statistics.

Provides a quick overview of the feedback tickets and product metrics
without running the full pipeline.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import sys
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from pipeline.data.feedback_data import SYNTHETIC_TICKETS, get_feedback_summary
from pipeline.data.metrics_data import MONTHLY_METRICS, compute_trend_analysis
from pipeline.utils.formatting import format_currency, format_percentage


def main() -> None:
    """Print comprehensive data analysis."""
    console = Console()
    console.print(Panel("[bold]Synthetic Data Analysis[/bold]", border_style="cyan"))

    # ---- Feedback Summary ----
    summary = get_feedback_summary()

    console.print("\n[bold underline]Feedback Tickets[/bold underline]")
    console.print(f"  Total tickets: {summary['total_tickets']}")
    console.print(f"  Total ARR at risk: {format_currency(summary['total_arr_at_risk'])}")
    console.print(f"  Average ARR: {format_currency(summary['average_arr'])}")
    console.print(f"  Weighted severity: {summary['weighted_avg_severity']}")

    # Severity table
    sev_table = Table(title="Severity Distribution", border_style="red")
    sev_table.add_column("Severity", style="bold")
    sev_table.add_column("Count", justify="right")
    sev_table.add_column("% of Total", justify="right")
    for sev, count in summary["severity_distribution"].items():
        pct = format_percentage(count / summary["total_tickets"] * 100)
        sev_table.add_row(sev.title(), str(count), pct)
    console.print(sev_table)

    # Category table
    cat_table = Table(title="Top Categories", border_style="blue")
    cat_table.add_column("Category", style="cyan")
    cat_table.add_column("Count", justify="right")
    for cat, count in summary["top_categories"]:
        cat_table.add_row(cat, str(count))
    console.print(cat_table)

    # ---- Metrics Trends ----
    console.print("\n[bold underline]Product Metrics Trends[/bold underline]")
    trends = compute_trend_analysis()
    console.print(f"  Period: {trends['period']}")
    console.print(f"  Overall health: [red]{trends['overall_health']}[/red]")

    metrics_table = Table(title="6-Month Metric Trends", border_style="magenta")
    metrics_table.add_column("Metric", style="cyan")
    metrics_table.add_column("Start", justify="right")
    metrics_table.add_column("End", justify="right")
    metrics_table.add_column("Change %", justify="right")
    metrics_table.add_column("Direction")

    for key in ["nps", "churn_rate", "support_tickets", "feature_adoption", "csat", "mrr", "active_users"]:
        t = trends[key]
        direction = t.get("direction", "—")
        color = "red" if direction in ("declining", "worsening") else "green"
        metrics_table.add_row(
            key.replace("_", " ").title(),
            str(t["start"]),
            str(t["end"]),
            f"[{color}]{t['change']}%[/{color}]",
            f"[{color}]{direction}[/{color}]",
        )
    console.print(metrics_table)

    console.print(f"\n[dim]{trends['summary']}[/dim]")


if __name__ == "__main__":
    main()
