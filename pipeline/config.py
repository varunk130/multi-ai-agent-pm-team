"""
Pipeline configuration using Pydantic BaseSettings.

Loads configuration from environment variables and provides defaults.

SECURITY NOTE:
  Never commit API keys or secrets to source code. Use environment variables
  or a .env file (which MUST be in .gitignore). All data is 100% synthetic.

Built by Varun Kulkarni.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings


class ModelConfig(BaseModel):
    """Configuration for an AI model backend."""

    provider: str = "anthropic"
    model_id: str = "claude-sonnet-4-20250514"
    max_tokens: int = 4096
    temperature: float = 0.7


class AgentConfig(BaseModel):
    """Configuration for a single pipeline agent."""

    number: int
    name: str
    cognitive_function: str
    color: str
    description: str
    model: ModelConfig = Field(default_factory=ModelConfig)
    enabled: bool = True


# The six agents that form the sequential pipeline — mirrors the JS frontend definitions.
DEFAULT_AGENTS: list[dict] = [
    {
        "number": 1,
        "name": "Customer Feedback Pipeline",
        "cognitive_function": "Pattern Recognition & Synthesis",
        "color": "#3b82f6",
        "description": (
            "Ingests 50 synthetic support tickets and surfaces recurring themes, "
            "severity distribution, and ARR-weighted priority ranking."
        ),
    },
    {
        "number": 2,
        "name": "Data Scientist",
        "cognitive_function": "Statistical Analysis & Correlation",
        "color": "#8b5cf6",
        "description": (
            "Cross-references feedback themes against 6-month product metrics. "
            "Computes correlations, cohort analysis, and funnel diagnostics."
        ),
    },
    {
        "number": 3,
        "name": "Metrics Narrator",
        "cognitive_function": "Narrative Intelligence & Forecasting",
        "color": "#06b6d4",
        "description": (
            "Translates quantitative findings into an executive narrative with "
            "leading indicators, risk factors, and an opportunity score."
        ),
    },
    {
        "number": 4,
        "name": "Chief of Staff",
        "cognitive_function": "Strategic Reasoning & Decision Framing",
        "color": "#f59e0b",
        "description": (
            "Generates strategic options with trade-off analysis, pre-mortem, "
            "and resource requirements. Outputs a clear recommendation."
        ),
    },
    {
        "number": 5,
        "name": "PRD Architect",
        "cognitive_function": "Structured Documentation & Specification",
        "color": "#10b981",
        "description": (
            "Produces a complete Product Requirements Document with user stories, "
            "acceptance criteria, and technical requirements."
        ),
    },
    {
        "number": 6,
        "name": "Stakeholder Translator",
        "cognitive_function": "Audience-Adaptive Communication",
        "color": "#ef4444",
        "description": (
            "Generates tailored communications for five audiences: engineering, "
            "executive, board, customer-facing, and sales enablement."
        ),
    },
]


class PipelineConfig(BaseSettings):
    """
    Root configuration for the Multi AI Agent PM Team pipeline.

    Values are loaded from environment variables prefixed with ``PIPELINE_``.
    A ``.env`` file in the project root is also supported.
    """

    model_config = {"env_prefix": "PIPELINE_", "env_file": ".env", "extra": "ignore"}

    # API configuration — NEVER commit real keys
    anthropic_api_key: str = Field(
        default="sk-ant-SYNTHETIC-KEY-DO-NOT-USE",
        description="Anthropic API key. Set via PIPELINE_ANTHROPIC_API_KEY env var.",
    )
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    output_format: Literal["rich", "json", "plain"] = "rich"
    max_retries: int = 3
    timeout_seconds: int = 120

    # Agent configs built from defaults
    agents: list[AgentConfig] = Field(
        default_factory=lambda: [AgentConfig(**a) for a in DEFAULT_AGENTS]
    )

    def get_agent(self, number: int) -> AgentConfig:
        """Return the agent config for the given 1-based agent number."""
        for agent in self.agents:
            if agent.number == number:
                return agent
        raise ValueError(f"No agent with number {number}")

    @property
    def enabled_agents(self) -> list[AgentConfig]:
        """Return only agents that are enabled."""
        return [a for a in self.agents if a.enabled]
