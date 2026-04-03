"""
Agent 5 — PRD Architect.

Generates a complete Product Requirements Document from the Chief of Staff's
strategic recommendation. Includes problem statement, user stories,
acceptance criteria, and technical requirements.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.models import (
    Agent1Output,
    Agent3Output,
    Agent4Output,
    Agent5Output,
    TechnicalRequirement,
    UserStory,
)


class PRDArchitectAgent(BaseAgent):
    """Agent 5 — structured PRD generation."""

    @property
    def name(self) -> str:
        return "PRD Architect"

    @property
    def agent_number(self) -> int:
        return 5

    @property
    def cognitive_function(self) -> str:
        return "Structured Documentation & Specification"

    @property
    def color(self) -> str:
        return "#10b981"

    def process(self, context: dict[str, Any]) -> Agent5Output:
        agent1: Agent1Output = context["agent_1"]
        agent3: Agent3Output = context["agent_3"]
        agent4: Agent4Output = context["agent_4"]

        top_themes = agent1.priority_ranking[:3]
        recommended = agent4.options[0]  # Option A

        title = f"Platform Hardening Initiative — {', '.join(top_themes)}"

        problem_statement = (
            f"Over the past six months, key product health metrics have declined across "
            f"the board. NPS dropped by {abs(agent3.opportunity_score):.0f}%-equivalent "
            f"opportunity points, monthly churn nearly doubled, and support ticket volume "
            f"increased by over 60%. Analysis of {agent1.total_tickets_analyzed} customer "
            f"feedback tickets reveals {len(agent1.themes)} distinct pain-point themes, with "
            f"{', '.join(top_themes)} driving the largest ARR risk "
            f"(${agent1.total_arr_at_risk:,} total). Without intervention, the business "
            f"risks losing multiple enterprise accounts and failing to meet annual targets."
        )

        # ---- User Stories ----
        stories: list[UserStory] = [
            UserStory(
                persona="Enterprise API Consumer",
                story=(
                    "As an enterprise API consumer, I need consistent sub-second response "
                    "times so that my integration doesn't timeout during peak hours."
                ),
                acceptance_criteria=[
                    "P95 API latency ≤ 500ms under normal load",
                    "P99 API latency ≤ 2s under peak load",
                    "Batch endpoint handles 1000+ records without 500 errors",
                    "Rate limits configurable per enterprise tier",
                    "Webhook delivery within 30 seconds of event",
                ],
                priority="must-have",
            ),
            UserStory(
                persona="Security & Compliance Officer",
                story=(
                    "As a compliance officer, I need a complete audit trail and RBAC so "
                    "that we pass our SOC 2 audit without findings."
                ),
                acceptance_criteria=[
                    "All data exports logged with user, timestamp, and scope",
                    "RBAC with at least 5 role levels for workspace management",
                    "GDPR deletion requests processed within 48 hours",
                    "IP allowlisting available for API access",
                    "Multi-tenant data isolation verified and documented",
                ],
                priority="must-have",
            ),
            UserStory(
                persona="Enterprise IT Administrator",
                story=(
                    "As an IT admin, I need reliable SSO and SCIM provisioning so that "
                    "user access is managed centrally and revoked promptly."
                ),
                acceptance_criteria=[
                    "SAML SSO success rate ≥ 99.5%",
                    "SCIM provisioning changes applied within 15 minutes",
                    "2FA available for all account types including service accounts",
                    "Single sign-out propagates across federated applications",
                    "Self-service password reset available for end users",
                ],
                priority="must-have",
            ),
            UserStory(
                persona="Business Analyst",
                story=(
                    "As a business analyst, I need a responsive dashboard with rich "
                    "visualizations so I can generate reports without performance issues."
                ),
                acceptance_criteria=[
                    "Dashboard loads within 3 seconds for 90-day date ranges",
                    "Data tables support virtual scrolling for 10K+ rows",
                    "New chart types: scatter, waterfall, heatmap",
                    "Consistent timezone handling across all views",
                    "WCAG 2.1 AA accessibility compliance",
                ],
                priority="should-have",
            ),
            UserStory(
                persona="Field Sales Representative",
                story=(
                    "As a field rep, I need a stable mobile app with offline support so "
                    "I can capture data and present reports in low-connectivity areas."
                ),
                acceptance_criteria=[
                    "PDF report generation stable for 500+ data points",
                    "Offline data capture with automatic sync",
                    "Push notification delivery rate ≥ 95% on iOS and Android",
                    "App crash rate < 0.1% per session",
                ],
                priority="should-have",
            ),
            UserStory(
                persona="Product Manager",
                story=(
                    "As a product manager, I need accurate billing and clear API versioning "
                    "so that customer trust is maintained and integrations don't break."
                ),
                acceptance_criteria=[
                    "Billing matches dashboard usage metrics within 1% tolerance",
                    "Semantic versioning enforced — no breaking changes in minor releases",
                    "API changelog published with every release",
                    "Finance team read-only access to billing portal",
                ],
                priority="nice-to-have",
            ),
        ]

        # ---- Technical Requirements ----
        tech_reqs: list[TechnicalRequirement] = [
            TechnicalRequirement(
                requirement="API gateway with configurable rate limiting and caching",
                category="performance",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="Database connection pool optimization — fix memory leak",
                category="reliability",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="Audit logging service with immutable event store",
                category="security",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="RBAC engine with hierarchical role inheritance",
                category="security",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="Multi-tenant isolation verification suite",
                category="security",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="SSO reliability improvements — SAML flow hardening",
                category="reliability",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="SCIM sync pipeline — reduce latency to <15 minutes",
                category="performance",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="Dashboard rendering — virtual scrolling and lazy loading",
                category="performance",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="Webhook delivery — exponential backoff and guaranteed delivery",
                category="reliability",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="Mobile app stability — crash-free sessions target 99.9%",
                category="reliability",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="GraphQL N+1 query resolution with DataLoader pattern",
                category="performance",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="Horizontal scaling for batch API endpoint",
                category="scalability",
                priority="P1",
            ),
            TechnicalRequirement(
                requirement="GDPR deletion pipeline — automated within 48 hours",
                category="security",
                priority="P0",
            ),
            TechnicalRequirement(
                requirement="API versioning governance — automated breaking change detection",
                category="compatibility",
                priority="P2",
            ),
        ]

        # ---- Success Metrics ----
        success_metrics = [
            "NPS recovery of +8 points within two quarters",
            "Monthly churn reduction from 3.8% to ≤ 2.5%",
            "Support ticket volume decrease of 25%",
            "API P95 latency ≤ 500ms",
            "SSO success rate ≥ 99.5%",
            "Zero SOC 2 audit findings related to access control",
            "Feature adoption recovery to ≥ 65%",
            f"ARR protection: retain ≥ 90% of the ${agent1.total_arr_at_risk:,} at risk",
        ]

        out_of_scope = [
            "New feature development unrelated to platform hardening",
            "Third-party integration marketplace expansion",
            "Mobile app redesign (beyond stability fixes)",
            "Localization / internationalization (deferred to Q4)",
            "Pricing model changes",
        ]

        # ---- Full PRD Content ----
        content = f"""# {title}

**Version:** 1.0.0
**Author:** AI Pipeline — Varun Kulkarni
**Status:** Draft
**Date:** 2024-03-15

---

## 1. Problem Statement

{problem_statement}

## 2. Strategic Context

{agent4.strategic_recommendation}

Recommended approach: **{recommended.name}**
Timeline: {recommended.timeline_weeks} weeks
Confidence: {recommended.confidence_level}

## 3. User Stories

"""
        for i, s in enumerate(stories, 1):
            content += f"### 3.{i} {s.persona}\n\n"
            content += f"_{s.story}_\n\n"
            content += f"**Priority:** {s.priority}\n\n"
            content += "**Acceptance Criteria:**\n"
            for ac in s.acceptance_criteria:
                content += f"- [ ] {ac}\n"
            content += "\n"

        content += "## 4. Technical Requirements\n\n"
        content += "| Requirement | Category | Priority |\n"
        content += "|-------------|----------|----------|\n"
        for tr in tech_reqs:
            content += f"| {tr.requirement} | {tr.category} | {tr.priority} |\n"

        content += "\n## 5. Success Metrics\n\n"
        for sm in success_metrics:
            content += f"- {sm}\n"

        content += "\n## 6. Out of Scope\n\n"
        for oos in out_of_scope:
            content += f"- {oos}\n"

        content += f"\n## 7. Resource Requirements\n\n"
        content += f"- **Engineering:** {agent4.resource_requirements.get('engineering_headcount', 'TBD')} engineers\n"
        content += f"- **Product Management:** {agent4.resource_requirements.get('product_management', 'TBD')} PM\n"
        content += f"- **Design:** {agent4.resource_requirements.get('design', 'TBD')} designer\n"
        content += f"- **Budget:** ${agent4.resource_requirements.get('estimated_budget_usd', 0):,}\n"
        content += f"- **Timeline:** {recommended.timeline_weeks} weeks\n"

        return Agent5Output(
            title=title,
            version="1.0.0",
            author="AI Pipeline — Varun Kulkarni",
            problem_statement=problem_statement,
            user_stories=stories,
            technical_requirements=tech_reqs,
            success_metrics=success_metrics,
            out_of_scope=out_of_scope,
            content=content,
        )
