"""
Pydantic data models for all agent inputs and outputs.

Every agent in the pipeline has a strongly-typed contract defined here.
This enables validation, serialization, and schema generation.

All sample data referenced in these models is 100% synthetic and fictional.
Built by Varun Kulkarni.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field, field_validator


# ---------------------------------------------------------------------------
# Shared / Input Models
# ---------------------------------------------------------------------------


class FeedbackTicket(BaseModel):
    """A single synthetic customer feedback ticket."""

    id: str = Field(..., description="Unique ticket identifier, e.g. 'TICKET-001'")
    title: str = Field(..., min_length=1, max_length=300)
    customer: str = Field(..., description="Fictional company name")
    severity: Literal["critical", "high", "medium", "low"] = Field(
        ..., description="Ticket severity level"
    )
    category: str = Field(..., description="Product area or category")
    arr: int = Field(..., ge=0, description="Annual Recurring Revenue in USD")
    description: str = Field(..., min_length=1)
    status: Literal["open", "in_progress", "resolved", "closed"] = "open"
    created_date: str = Field(default="2024-01-15", description="ISO date string")

    @field_validator("arr")
    @classmethod
    def arr_must_be_reasonable(cls, v: int) -> int:
        if v > 50_000_000:
            raise ValueError("ARR exceeds reasonable synthetic maximum of $50M")
        return v


class MonthlyMetric(BaseModel):
    """A single month of product metrics — all values synthetic."""

    month: str = Field(..., description="Month label, e.g. 'Jan 2024'")
    nps: float = Field(..., ge=-100, le=100, description="Net Promoter Score")
    churn_rate: float = Field(..., ge=0, le=100, description="Monthly churn %")
    support_tickets: int = Field(..., ge=0, description="Total support tickets")
    feature_adoption: float = Field(..., ge=0, le=100, description="Feature adoption %")
    response_time_hours: float = Field(..., ge=0, description="Avg response time in hours")
    csat: float = Field(..., ge=0, le=100, description="Customer satisfaction score")
    mrr: int = Field(..., ge=0, description="Monthly recurring revenue USD")
    active_users: int = Field(..., ge=0, description="Monthly active users")


# ---------------------------------------------------------------------------
# Agent 1 — Customer Feedback Pipeline
# ---------------------------------------------------------------------------


class ThemeAnalysis(BaseModel):
    """A cluster of related feedback tickets forming a theme."""

    name: str = Field(..., description="Theme name, e.g. 'API Performance'")
    ticket_count: int = Field(..., ge=0)
    avg_severity: float = Field(..., ge=0, le=4)
    total_arr_impact: int = Field(..., ge=0, description="Sum of ARR for tickets in theme")
    sample_tickets: list[str] = Field(
        default_factory=list, description="Up to 5 representative ticket IDs"
    )
    urgency_score: float = Field(
        ..., ge=0, le=100, description="Computed urgency combining severity + ARR"
    )
    keywords: list[str] = Field(default_factory=list, description="Top keywords for this theme")


class Agent1Output(BaseModel):
    """Output contract for Agent 1 — Customer Feedback Pipeline."""

    agent_number: int = 1
    agent_name: str = "Customer Feedback Pipeline"
    summary: str = Field(..., min_length=10, description="Human-readable summary")
    themes: list[ThemeAnalysis] = Field(..., min_length=1)
    priority_ranking: list[str] = Field(
        ..., description="Theme names ordered by urgency_score descending"
    )
    key_insight: str = Field(..., min_length=10)
    total_tickets_analyzed: int = Field(..., ge=0)
    severity_distribution: dict[str, int] = Field(
        default_factory=dict, description="Count per severity level"
    )
    total_arr_at_risk: int = Field(..., ge=0)
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Agent 2 — Data Scientist
# ---------------------------------------------------------------------------


class Correlation(BaseModel):
    """A correlation between a feedback theme and a product metric."""

    theme: str
    metric: str
    correlation_strength: float = Field(..., ge=-1.0, le=1.0)
    confidence_interval: tuple[float, float] = Field(
        ..., description="95% CI as (lower, upper)"
    )
    insight: str = Field(..., min_length=5)
    p_value: float = Field(default=0.05, ge=0, le=1)


class CohortAnalysis(BaseModel):
    """Analysis of a customer cohort segment."""

    cohort_name: str
    ticket_count: int = Field(..., ge=0)
    avg_arr: int = Field(..., ge=0)
    dominant_theme: str
    churn_risk: Literal["low", "medium", "high", "critical"]
    insight: str


class FunnelStage(BaseModel):
    """A single stage in the conversion/retention funnel."""

    stage_name: str
    value: float = Field(..., ge=0)
    drop_off_pct: float = Field(default=0, ge=0, le=100)
    note: str = ""


class Agent2Output(BaseModel):
    """Output contract for Agent 2 — Data Scientist."""

    agent_number: int = 2
    agent_name: str = "Data Scientist"
    summary: str = Field(..., min_length=10)
    correlations: list[Correlation] = Field(..., min_length=1)
    cohort_analysis: list[CohortAnalysis] = Field(default_factory=list)
    funnel_analysis: list[FunnelStage] = Field(default_factory=list)
    statistical_summary: str = Field(..., min_length=10)
    data_quality_score: float = Field(default=0.95, ge=0, le=1)
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Agent 3 — Metrics Narrator
# ---------------------------------------------------------------------------


class KeyFinding(BaseModel):
    """A key finding synthesized from upstream agent outputs."""

    title: str = Field(..., min_length=5)
    evidence: str = Field(..., min_length=10)
    implication: str = Field(..., min_length=10)
    severity: Literal["informational", "warning", "critical"] = "informational"


class LeadingIndicator(BaseModel):
    """A metric trend that predicts future outcomes."""

    indicator: str
    current_trend: Literal["improving", "stable", "declining"]
    prediction: str
    confidence: float = Field(default=0.7, ge=0, le=1)
    time_horizon_weeks: int = Field(default=12, ge=1)


class RiskFactor(BaseModel):
    """An identified risk to the product or business."""

    risk: str
    probability: Literal["low", "medium", "high"]
    impact: Literal["low", "medium", "high", "critical"]
    mitigation: str
    owner: str = "Product Team"


class Agent3Output(BaseModel):
    """Output contract for Agent 3 — Metrics Narrator."""

    agent_number: int = 3
    agent_name: str = "Metrics Narrator"
    executive_summary: str = Field(..., min_length=20)
    key_findings: list[KeyFinding] = Field(..., min_length=1)
    leading_indicators: list[LeadingIndicator] = Field(default_factory=list)
    risk_factors: list[RiskFactor] = Field(default_factory=list)
    opportunity_score: float = Field(..., ge=0, le=100)
    narrative: str = Field(default="", description="Full narrative markdown")
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Agent 4 — Chief of Staff
# ---------------------------------------------------------------------------


class StrategicOption(BaseModel):
    """A strategic option for the leadership team to evaluate."""

    name: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    pros: list[str] = Field(..., min_length=1)
    cons: list[str] = Field(..., min_length=1)
    timeline_weeks: int = Field(..., ge=1, le=104)
    estimated_impact: str = Field(..., description="Expected outcome description")
    confidence_level: Literal["low", "medium", "high"] = "medium"
    resource_cost: str = Field(default="TBD", description="Rough cost estimate")


class PremortemItem(BaseModel):
    """A pre-mortem analysis item — what could go wrong."""

    failure_mode: str
    likelihood: Literal["low", "medium", "high"]
    preventive_action: str


class Agent4Output(BaseModel):
    """Output contract for Agent 4 — Chief of Staff."""

    agent_number: int = 4
    agent_name: str = "Chief of Staff"
    strategic_recommendation: str = Field(..., min_length=20)
    options: list[StrategicOption] = Field(..., min_length=2)
    recommendation: str = Field(..., min_length=10, description="Which option and why")
    premortem: list[PremortemItem] = Field(default_factory=list)
    resource_requirements: dict[str, Any] = Field(
        default_factory=dict,
        description="Estimated headcount, budget, timeline",
    )
    decision_deadline: str = Field(default="2 weeks", description="When decision is needed by")
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Agent 5 — PRD Architect
# ---------------------------------------------------------------------------


class UserStory(BaseModel):
    """A user story within the PRD."""

    persona: str
    story: str
    acceptance_criteria: list[str] = Field(..., min_length=1)
    priority: Literal["must-have", "should-have", "nice-to-have"] = "must-have"


class TechnicalRequirement(BaseModel):
    """A technical requirement or constraint."""

    requirement: str
    category: Literal["performance", "security", "scalability", "compatibility", "reliability"]
    priority: Literal["P0", "P1", "P2"] = "P1"


class Agent5Output(BaseModel):
    """Output contract for Agent 5 — PRD Architect."""

    agent_number: int = 5
    agent_name: str = "PRD Architect"
    title: str = Field(..., min_length=5)
    version: str = Field(default="1.0.0")
    author: str = Field(default="AI Pipeline — Varun Kulkarni")
    problem_statement: str = Field(..., min_length=20)
    user_stories: list[UserStory] = Field(..., min_length=1)
    technical_requirements: list[TechnicalRequirement] = Field(default_factory=list)
    success_metrics: list[str] = Field(default_factory=list)
    out_of_scope: list[str] = Field(default_factory=list)
    content: str = Field(..., min_length=50, description="Full PRD markdown")
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Agent 6 — Stakeholder Translator
# ---------------------------------------------------------------------------


class StakeholderCommunication(BaseModel):
    """A communication tailored for a specific audience."""

    audience: Literal["engineering", "executive", "board", "customer", "sales"]
    subject: str = Field(..., min_length=5)
    tone: Literal["technical", "strategic", "formal", "empathetic", "persuasive"]
    content: str = Field(..., min_length=20)
    key_points: list[str] = Field(..., min_length=1)
    call_to_action: str = Field(..., min_length=5)


class Agent6Output(BaseModel):
    """Output contract for Agent 6 — Stakeholder Translator."""

    agent_number: int = 6
    agent_name: str = "Stakeholder Translator"
    communications: dict[str, StakeholderCommunication] = Field(
        ..., description="Keyed by audience name"
    )
    processing_time_ms: float = Field(default=0, ge=0)


# ---------------------------------------------------------------------------
# Full Pipeline Result
# ---------------------------------------------------------------------------


class PipelineResult(BaseModel):
    """Complete result from running the full 6-agent pipeline."""

    agent_outputs: dict[str, Any] = Field(
        ..., description="Agent outputs keyed by 'agent_N'"
    )
    total_duration_ms: float = Field(..., ge=0)
    timestamp: str = Field(
        default_factory=lambda: datetime.utcnow().isoformat(),
        description="ISO timestamp of pipeline completion",
    )
    pipeline_version: str = Field(default="1.0.0")
    status: Literal["success", "partial", "failed"] = "success"
    errors: list[str] = Field(default_factory=list)
