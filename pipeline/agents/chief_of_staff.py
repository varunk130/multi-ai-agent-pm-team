"""
Agent 4 — Chief of Staff.

Generates strategic options from the upstream analysis, performs trade-off
evaluation, pre-mortem analysis, and resource estimation. Outputs a clear
recommendation for the leadership team.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.models import (
    Agent1Output,
    Agent3Output,
    Agent4Output,
    PremortemItem,
    StrategicOption,
)


class ChiefOfStaffAgent(BaseAgent):
    """Agent 4 — strategic reasoning and decision framing."""

    @property
    def name(self) -> str:
        return "Chief of Staff"

    @property
    def agent_number(self) -> int:
        return 4

    @property
    def cognitive_function(self) -> str:
        return "Strategic Reasoning & Decision Framing"

    @property
    def color(self) -> str:
        return "#f59e0b"

    def process(self, context: dict[str, Any]) -> Agent4Output:
        agent1: Agent1Output = context["agent_1"]
        agent3: Agent3Output = context["agent_3"]

        top_themes = agent1.priority_ranking[:3]
        opp_score = agent3.opportunity_score

        # ---- Strategic Options ----
        options: list[StrategicOption] = [
            StrategicOption(
                name="Option A: Full-Stack Platform Hardening",
                description=(
                    f"Address the top 3 themes ({', '.join(top_themes)}) with a dedicated "
                    f"cross-functional tiger team. Focus on API performance, security compliance, "
                    f"and authentication reliability simultaneously."
                ),
                pros=[
                    "Addresses root causes comprehensively",
                    "Shows commitment to enterprise customers",
                    f"Targets ${agent1.total_arr_at_risk:,} ARR at risk directly",
                    "Improves multiple health metrics in parallel",
                    "Strong signal to market and analysts",
                ],
                cons=[
                    "Requires significant engineering investment (6+ engineers for 12 weeks)",
                    "Delays new feature development roadmap by one quarter",
                    "Risk of scope creep across multiple workstreams",
                    "May not show results for 8-10 weeks",
                ],
                timeline_weeks=12,
                estimated_impact=(
                    f"Expected to reduce churn by 1.0-1.5pp and recover "
                    f"NPS by 8-12 points within two quarters. Estimated revenue "
                    f"protection: $5-8M annually."
                ),
                confidence_level="high",
                resource_cost="$450K-$600K (6 engineers × 12 weeks + infrastructure)",
            ),
            StrategicOption(
                name="Option B: Targeted API & Security Sprint",
                description=(
                    f"Focus exclusively on the highest-urgency theme ('{top_themes[0]}') and "
                    f"Security & Compliance as the two themes with the greatest ARR impact. "
                    f"Defer other themes to subsequent quarters."
                ),
                pros=[
                    "Lower resource commitment (3-4 engineers)",
                    "Faster time-to-impact (6-8 weeks)",
                    "Addresses the themes driving largest ARR risk",
                    "Allows parallel progress on product roadmap",
                ],
                cons=[
                    "Leaves several pain points unaddressed",
                    "Authentication and UX issues may worsen",
                    "Partial fix may not fully reverse NPS trajectory",
                    "May require follow-up sprint, extending total timeline",
                ],
                timeline_weeks=8,
                estimated_impact=(
                    "Expected to reduce churn by 0.5-0.8pp and stabilize NPS decline. "
                    "Estimated revenue protection: $3-4M annually."
                ),
                confidence_level="medium",
                resource_cost="$200K-$300K (4 engineers × 8 weeks)",
            ),
            StrategicOption(
                name="Option C: Customer Success + Quick Fixes",
                description=(
                    "Combine targeted customer success outreach to top-20 ARR accounts "
                    "with quick-win fixes (documentation, notification improvements, UX polish). "
                    "Buy time while planning a larger initiative for Q3."
                ),
                pros=[
                    "Minimal engineering disruption (1-2 engineers)",
                    "Immediate relationship impact via customer success outreach",
                    "Quick wins build goodwill and reduce support volume",
                    "Preserves product roadmap timeline",
                    "Lowest cost and risk",
                ],
                cons=[
                    "Does not address structural platform issues",
                    "Risk of appearing reactive rather than strategic",
                    "Churn may continue if root causes persist",
                    "Top accounts may see through surface-level fixes",
                    "Delays real resolution to Q3-Q4",
                ],
                timeline_weeks=4,
                estimated_impact=(
                    "Expected to prevent 2-3 immediate account losses and reduce support "
                    "volume by 10-15%. Limited long-term churn reduction."
                ),
                confidence_level="low",
                resource_cost="$80K-$120K (2 engineers × 4 weeks + CS team time)",
            ),
        ]

        # ---- Recommendation ----
        recommendation = (
            f"**Recommended: Option A — Full-Stack Platform Hardening.**\n\n"
            f"With an opportunity score of {opp_score}/100 and ${agent1.total_arr_at_risk:,} "
            f"ARR at risk, the data strongly supports a comprehensive approach. The declining "
            f"trajectory across all health metrics indicates that partial measures (Options B/C) "
            f"are unlikely to reverse the trend.\n\n"
            f"Option A requires the largest investment but offers the highest confidence of "
            f"meaningful impact. The 12-week timeline aligns with Q2 planning, and early wins "
            f"in the first 4 weeks can demonstrate progress to stakeholders.\n\n"
            f"If resource constraints make Option A infeasible, Option B is a viable fallback "
            f"but should be paired with the customer success outreach from Option C."
        )

        # ---- Pre-mortem ----
        premortem: list[PremortemItem] = [
            PremortemItem(
                failure_mode="Tiger team pulls engineers from critical maintenance, causing new incidents",
                likelihood="medium",
                preventive_action=(
                    "Maintain a 2-person on-call rotation separate from the tiger team. "
                    "Set clear escalation boundaries."
                ),
            ),
            PremortemItem(
                failure_mode="Scope expands beyond the 3 target themes, diluting focus",
                likelihood="high",
                preventive_action=(
                    "Appoint a dedicated PM as scope guardian. Weekly scope reviews with "
                    "VP Engineering sign-off required for any additions."
                ),
            ),
            PremortemItem(
                failure_mode="Enterprise customers churn before improvements ship",
                likelihood="medium",
                preventive_action=(
                    "Launch parallel customer success outreach (Option C elements) in week 1. "
                    "Provide roadmap commitments with specific dates to at-risk accounts."
                ),
            ),
            PremortemItem(
                failure_mode="Improvements don't move the needle on NPS/churn",
                likelihood="low",
                preventive_action=(
                    "Define leading metrics checkpoints at weeks 4 and 8. "
                    "If support ticket volume hasn't decreased by 10%, pivot strategy."
                ),
            ),
            PremortemItem(
                failure_mode="Team morale drops during intense 12-week sprint",
                likelihood="medium",
                preventive_action=(
                    "Build in a decompression week between sprints. Celebrate wins publicly. "
                    "Provide clear career growth recognition for participants."
                ),
            ),
        ]

        # ---- Resource Requirements ----
        resource_requirements = {
            "engineering_headcount": 6,
            "product_management": 1,
            "design": 1,
            "customer_success": 2,
            "estimated_budget_usd": 550_000,
            "timeline_weeks": 12,
            "infrastructure_changes": [
                "API gateway upgrade",
                "Database connection pool optimization",
                "Audit logging service deployment",
                "RBAC service implementation",
            ],
            "external_dependencies": [
                "SOC 2 auditor availability for compliance review",
                "Enterprise customer availability for beta testing",
            ],
        }

        return Agent4Output(
            strategic_recommendation=(
                f"Based on analysis of {agent1.total_tickets_analyzed} feedback tickets, "
                f"{len(agent3.key_findings)} key findings, and an opportunity score of "
                f"{opp_score}/100, we recommend a 12-week Full-Stack Platform Hardening "
                f"initiative targeting the top 3 themes: {', '.join(top_themes)}."
            ),
            options=options,
            recommendation=recommendation,
            premortem=premortem,
            resource_requirements=resource_requirements,
            decision_deadline="2 weeks — before Q2 sprint planning locks",
        )
