"""
Pytest fixtures for the Multi AI Agent PM Team pipeline tests.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest

from pipeline.config import PipelineConfig
from pipeline.data.feedback_data import SYNTHETIC_TICKETS
from pipeline.data.metrics_data import MONTHLY_METRICS
from pipeline.agents.feedback_pipeline import FeedbackPipelineAgent
from pipeline.agents.data_scientist import DataScientistAgent
from pipeline.agents.metrics_narrator import MetricsNarratorAgent
from pipeline.agents.chief_of_staff import ChiefOfStaffAgent
from pipeline.agents.prd_architect import PRDArchitectAgent
from pipeline.agents.stakeholder_translator import StakeholderTranslatorAgent


@pytest.fixture
def sample_tickets() -> list[dict]:
    """Return the full set of 50 synthetic tickets."""
    return SYNTHETIC_TICKETS


@pytest.fixture
def sample_metrics() -> list[dict]:
    """Return the 6 months of synthetic metrics."""
    return MONTHLY_METRICS


@pytest.fixture
def pipeline_config() -> PipelineConfig:
    """Return a default pipeline config."""
    return PipelineConfig()


@pytest.fixture
def agent1_output():
    """Run Agent 1 and return its output."""
    agent = FeedbackPipelineAgent()
    return agent.run({})


@pytest.fixture
def agent2_output(agent1_output):
    """Run Agent 2 with Agent 1 context."""
    agent = DataScientistAgent()
    return agent.run({"agent_1": agent1_output})


@pytest.fixture
def agent3_output(agent1_output, agent2_output):
    """Run Agent 3 with upstream context."""
    agent = MetricsNarratorAgent()
    return agent.run({"agent_1": agent1_output, "agent_2": agent2_output})


@pytest.fixture
def agent4_output(agent1_output, agent2_output, agent3_output):
    """Run Agent 4 with upstream context."""
    agent = ChiefOfStaffAgent()
    return agent.run({
        "agent_1": agent1_output,
        "agent_2": agent2_output,
        "agent_3": agent3_output,
    })


@pytest.fixture
def agent5_output(agent1_output, agent2_output, agent3_output, agent4_output):
    """Run Agent 5 with upstream context."""
    agent = PRDArchitectAgent()
    return agent.run({
        "agent_1": agent1_output,
        "agent_2": agent2_output,
        "agent_3": agent3_output,
        "agent_4": agent4_output,
    })


@pytest.fixture
def agent6_output(agent1_output, agent2_output, agent3_output, agent4_output, agent5_output):
    """Run Agent 6 with full upstream context."""
    agent = StakeholderTranslatorAgent()
    return agent.run({
        "agent_1": agent1_output,
        "agent_2": agent2_output,
        "agent_3": agent3_output,
        "agent_4": agent4_output,
        "agent_5": agent5_output,
    })
