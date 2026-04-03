#!/usr/bin/env python3
"""
Validate all agent outputs match their Pydantic model contracts.

Runs the full pipeline and validates every output against its schema.
All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import sys
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from rich.console import Console

from pipeline.agents.feedback_pipeline import FeedbackPipelineAgent
from pipeline.agents.data_scientist import DataScientistAgent
from pipeline.agents.metrics_narrator import MetricsNarratorAgent
from pipeline.agents.chief_of_staff import ChiefOfStaffAgent
from pipeline.agents.prd_architect import PRDArchitectAgent
from pipeline.agents.stakeholder_translator import StakeholderTranslatorAgent
from pipeline.models import (
    Agent1Output,
    Agent2Output,
    Agent3Output,
    Agent4Output,
    Agent5Output,
    Agent6Output,
)


AGENT_CHAIN = [
    (FeedbackPipelineAgent, Agent1Output),
    (DataScientistAgent, Agent2Output),
    (MetricsNarratorAgent, Agent3Output),
    (ChiefOfStaffAgent, Agent4Output),
    (PRDArchitectAgent, Agent5Output),
    (StakeholderTranslatorAgent, Agent6Output),
]


def main() -> None:
    """Run agents and validate outputs."""
    console = Console()
    console.print("[bold cyan]Output Validation — All 6 Agents[/bold cyan]\n")

    context: dict = {}
    all_passed = True

    for agent_cls, expected_type in AGENT_CHAIN:
        agent = agent_cls()
        name = agent.name
        number = agent.agent_number

        try:
            output = agent.run(context)
            context[f"agent_{number}"] = output

            if isinstance(output, expected_type):
                # Verify serialization round-trip
                data = output.model_dump()
                restored = expected_type(**data)
                console.print(f"  [green]✓[/green] Agent {number} ({name}): Valid {expected_type.__name__}")
            else:
                console.print(f"  [red]✗[/red] Agent {number} ({name}): Wrong type — got {type(output).__name__}")
                all_passed = False
        except Exception as exc:
            console.print(f"  [red]✗[/red] Agent {number} ({name}): ERROR — {exc}")
            all_passed = False

    console.print()
    if all_passed:
        console.print("[green bold]All agent outputs validated successfully.[/green bold]")
    else:
        console.print("[red bold]Some validations failed. See above.[/red bold]")
        sys.exit(1)


if __name__ == "__main__":
    main()
