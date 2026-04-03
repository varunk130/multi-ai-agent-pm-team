"""
Agent 3 — Metrics Narrator.

Synthesizes the outputs of Agent 1 (feedback themes) and Agent 2 (statistical
analysis) into an executive narrative with leading indicators, risk factors,
and an overall opportunity score.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.data.metrics_data import compute_trend_analysis
from pipeline.models import (
    Agent1Output,
    Agent2Output,
    Agent3Output,
    KeyFinding,
    LeadingIndicator,
    RiskFactor,
)


def _compute_opportunity_score(
    trends: dict[str, Any],
    strong_correlations: int,
    total_arr_at_risk: int,
) -> float:
    """
    Compute an opportunity score (0–100).

    Higher scores indicate greater potential impact from addressing issues.
    """
    # NPS decline component (0–30)
    nps_delta = abs(trends["nps"]["start"] - trends["nps"]["end"])
    nps_component = min(nps_delta / 20 * 30, 30)

    # Churn acceleration component (0–25)
    churn_delta = trends["churn_rate"]["end"] - trends["churn_rate"]["start"]
    churn_component = min(churn_delta / 3 * 25, 25)

    # ARR risk component (0–25)
    arr_component = min(total_arr_at_risk / 50_000_000 * 25, 25)

    # Correlation evidence component (0–20)
    corr_component = min(strong_correlations / 10 * 20, 20)

    return round(nps_component + churn_component + arr_component + corr_component, 1)


class MetricsNarratorAgent(BaseAgent):
    """Agent 3 — translates quantitative findings into narrative intelligence."""

    @property
    def name(self) -> str:
        return "Metrics Narrator"

    @property
    def agent_number(self) -> int:
        return 3

    @property
    def cognitive_function(self) -> str:
        return "Narrative Intelligence & Forecasting"

    @property
    def color(self) -> str:
        return "#06b6d4"

    def process(self, context: dict[str, Any]) -> Agent3Output:
        agent1: Agent1Output = context["agent_1"]
        agent2: Agent2Output = context["agent_2"]
        trends = compute_trend_analysis()

        # ---- Key Findings ----
        findings: list[KeyFinding] = []

        # Finding 1: NPS decline
        findings.append(
            KeyFinding(
                title="Accelerating NPS Decline",
                evidence=(
                    f"NPS dropped from {trends['nps']['start']} to {trends['nps']['end']} "
                    f"({trends['nps']['change']}%) over 6 months. The decline is accelerating — "
                    f"the last 3 months saw a steeper drop than the first 3."
                ),
                implication=(
                    "If the trend continues, NPS will reach single digits within two quarters, "
                    "triggering enterprise contract renegotiations and increased churn risk."
                ),
                severity="critical",
            )
        )

        # Finding 2: Support ticket volume and churn correlation
        strong_corrs = [
            c for c in agent2.correlations if abs(c.correlation_strength) > 0.7
        ]
        findings.append(
            KeyFinding(
                title="Support Volume Driving Churn",
                evidence=(
                    f"Found {len(strong_corrs)} strong correlations between feedback themes "
                    f"and product metrics. Support tickets rose {trends['support_tickets']['change']}% "
                    f"while churn increased from {trends['churn_rate']['start']}% to "
                    f"{trends['churn_rate']['end']}%."
                ),
                implication=(
                    "Each 10% increase in support volume corresponds to approximately 0.3pp "
                    "increase in monthly churn. Resolving top themes could reverse the trend."
                ),
                severity="critical",
            )
        )

        # Finding 3: ARR concentration risk
        top_theme = agent1.themes[0] if agent1.themes else None
        if top_theme:
            findings.append(
                KeyFinding(
                    title="ARR Concentration in Top Theme",
                    evidence=(
                        f"'{top_theme.name}' accounts for ${top_theme.total_arr_impact:,} ARR "
                        f"at risk across {top_theme.ticket_count} tickets. "
                        f"This represents a significant portion of total at-risk revenue."
                    ),
                    implication=(
                        "Losing even one major customer in this theme could impact quarterly "
                        "revenue targets. Immediate targeted intervention recommended."
                    ),
                    severity="warning",
                )
            )

        # Finding 4: Feature adoption erosion
        findings.append(
            KeyFinding(
                title="Feature Adoption Erosion",
                evidence=(
                    f"Feature adoption declined from {trends['feature_adoption']['start']}% "
                    f"to {trends['feature_adoption']['end']}% "
                    f"({trends['feature_adoption']['change']}% change). "
                    f"This correlates with increased dashboard UX complaints."
                ),
                implication=(
                    "Lower feature adoption reduces switching costs, making customers more "
                    "likely to churn. Investment in UX and onboarding could reverse this."
                ),
                severity="warning",
            )
        )

        # Finding 5: MRR trajectory
        findings.append(
            KeyFinding(
                title="MRR Decline Trajectory",
                evidence=(
                    f"MRR dropped from ${trends['mrr']['start']:,} to ${trends['mrr']['end']:,}, "
                    f"a {trends['mrr']['change']}% decline. "
                    f"Active users decreased by {abs(trends['active_users']['change'])}%."
                ),
                implication=(
                    "At the current trajectory, annualized revenue loss exceeds $2.5M. "
                    "The compounding effect of churn on MRR demands urgent action."
                ),
                severity="critical",
            )
        )

        # ---- Leading Indicators ----
        indicators: list[LeadingIndicator] = [
            LeadingIndicator(
                indicator="Support Ticket Velocity",
                current_trend="declining",
                prediction=(
                    "Support tickets projected to exceed 650/month by Q3 if current "
                    "trajectory continues, overwhelming support capacity."
                ),
                confidence=0.82,
                time_horizon_weeks=12,
            ),
            LeadingIndicator(
                indicator="NPS Momentum",
                current_trend="declining",
                prediction=(
                    "NPS likely to drop below 25 within 8 weeks. Below 20 triggers "
                    "automatic enterprise contract review clauses."
                ),
                confidence=0.78,
                time_horizon_weeks=8,
            ),
            LeadingIndicator(
                indicator="Feature Adoption Rate",
                current_trend="declining",
                prediction=(
                    "Adoption expected to stabilize around 50% if no intervention, "
                    "but targeted UX improvements could recover to 65% within a quarter."
                ),
                confidence=0.65,
                time_horizon_weeks=16,
            ),
            LeadingIndicator(
                indicator="Churn Acceleration",
                current_trend="declining",
                prediction=(
                    "Monthly churn projected to reach 4.5% by end of Q2, representing "
                    "a critical threshold for net-negative revenue growth."
                ),
                confidence=0.75,
                time_horizon_weeks=10,
            ),
        ]

        # ---- Risk Factors ----
        risks: list[RiskFactor] = [
            RiskFactor(
                risk="Enterprise account loss in Security & Compliance theme",
                probability="high",
                impact="critical",
                mitigation="Accelerate SOC 2 audit trail and RBAC features",
                owner="Security Team",
            ),
            RiskFactor(
                risk="API performance degradation causing integration partner churn",
                probability="high",
                impact="high",
                mitigation="Invest in API infrastructure — caching, rate limit tiers, monitoring",
                owner="Platform Team",
            ),
            RiskFactor(
                risk="Competitor displacement during customer dissatisfaction window",
                probability="medium",
                impact="critical",
                mitigation="Launch customer success outreach to top 20 ARR accounts",
                owner="Customer Success",
            ),
            RiskFactor(
                risk="Support team burnout from rising ticket volume",
                probability="high",
                impact="medium",
                mitigation="Implement self-service tools and knowledge base improvements",
                owner="Support Operations",
            ),
        ]

        # ---- Opportunity Score ----
        opp_score = _compute_opportunity_score(
            trends,
            len(strong_corrs),
            agent1.total_arr_at_risk,
        )

        # ---- Narrative ----
        narrative = (
            f"## Executive Narrative\n\n"
            f"Over the past six months, product health metrics have shown a consistent "
            f"downward trajectory across all key dimensions. NPS has fallen by "
            f"{abs(trends['nps']['change'])}%, monthly churn has nearly doubled, and "
            f"support ticket volume has increased by {trends['support_tickets']['change']}%.\n\n"
            f"Analysis of {agent1.total_tickets_analyzed} customer feedback tickets reveals "
            f"{len(agent1.themes)} distinct themes, with '{agent1.priority_ranking[0]}' "
            f"emerging as the highest-urgency area. Statistical analysis confirms strong "
            f"correlations between rising ticket themes and declining satisfaction metrics.\n\n"
            f"**Opportunity Score: {opp_score}/100** — indicating significant upside potential "
            f"if the top issues are addressed within the next quarter.\n\n"
            f"Total ARR at risk: ${agent1.total_arr_at_risk:,}.\n"
        )

        return Agent3Output(
            executive_summary=(
                f"Product health is declining across all key metrics. {len(findings)} critical "
                f"findings identified with an opportunity score of {opp_score}/100. "
                f"Immediate action on the top {min(3, len(agent1.priority_ranking))} themes "
                f"could reverse the trajectory within one quarter."
            ),
            key_findings=findings,
            leading_indicators=indicators,
            risk_factors=risks,
            opportunity_score=opp_score,
            narrative=narrative,
        )
