"""
Agent 1 — Customer Feedback Pipeline.

Ingests 50 synthetic support tickets and clusters them into themes using
keyword matching. Scores urgency as a combination of severity and ARR impact.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import re
from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.data.feedback_data import SYNTHETIC_TICKETS, SEVERITY_WEIGHTS
from pipeline.models import Agent1Output, ThemeAnalysis


# Keyword → theme mapping.  Tickets matching multiple themes are assigned
# to the theme with the most keyword hits.
THEME_KEYWORDS: dict[str, list[str]] = {
    "API Performance": [
        "api", "latency", "timeout", "rate limit", "endpoint", "response time",
        "batch", "webhook", "graphql", "500 error", "rest", "versioning",
        "breaking change", "documentation", "backoff",
    ],
    "Security & Compliance": [
        "security", "compliance", "soc 2", "gdpr", "audit", "rbac", "encryption",
        "multi-tenant", "isolation", "data retention", "ip allowlist",
        "access control", "pii", "data export",
    ],
    "Authentication": [
        "sso", "saml", "login", "password", "2fa", "mfa", "authentication",
        "sign-out", "scim", "provisioning", "service account", "federated",
    ],
    "Dashboard UX": [
        "dashboard", "loading", "search", "chart", "report", "visualization",
        "rendering", "table", "timezone", "accessibility", "screen reader",
        "query language", "admin console",
    ],
    "Data Management": [
        "import", "export", "csv", "excel", "bulk", "sync", "warehouse",
        "conflict", "custom field", "pdf", "data", "encoding",
    ],
    "Mobile Experience": [
        "mobile", "app", "crash", "push notification", "offline", "ios",
        "android", "field",
    ],
    "Notifications": [
        "notification", "email", "alert", "scheduled report", "maintenance window",
        "alert fatigue",
    ],
    "Integrations": [
        "integration", "connector", "marketplace", "salesforce", "hubspot",
        "jira", "soap", "workflow automation",
    ],
    "Billing": [
        "billing", "invoice", "pricing", "usage", "overcharge", "finance",
    ],
    "Onboarding": [
        "onboarding", "wizard", "sandbox", "localization", "language",
    ],
}


def _classify_ticket(ticket: dict[str, Any]) -> str:
    """Return the best-matching theme for a ticket based on keyword hits."""
    text = f"{ticket['title']} {ticket['description']}".lower()
    scores: dict[str, int] = {}
    for theme, keywords in THEME_KEYWORDS.items():
        scores[theme] = sum(1 for kw in keywords if kw in text)
    # Fallback to explicit category if no keyword matches
    best = max(scores, key=lambda k: scores[k])
    if scores[best] == 0:
        return ticket.get("category", "Uncategorized")
    return best


def _urgency_score(avg_severity: float, total_arr: int, ticket_count: int) -> float:
    """
    Compute urgency on a 0–100 scale.

    Formula: 40% severity weight + 40% ARR weight + 20% volume weight
    """
    severity_component = (avg_severity / 4.0) * 40
    arr_component = min(total_arr / 20_000_000, 1.0) * 40
    volume_component = min(ticket_count / 15, 1.0) * 20
    return round(severity_component + arr_component + volume_component, 2)


class FeedbackPipelineAgent(BaseAgent):
    """Agent 1 — ingests and clusters synthetic feedback tickets."""

    @property
    def name(self) -> str:
        return "Customer Feedback Pipeline"

    @property
    def agent_number(self) -> int:
        return 1

    @property
    def cognitive_function(self) -> str:
        return "Pattern Recognition & Synthesis"

    @property
    def color(self) -> str:
        return "#3b82f6"

    @property
    def required_upstream_agents(self) -> list[str]:
        return []  # first agent — no upstream dependencies

    def process(self, context: dict[str, Any]) -> Agent1Output:
        tickets = SYNTHETIC_TICKETS

        # Classify every ticket
        classified: dict[str, list[dict[str, Any]]] = {}
        for t in tickets:
            theme = _classify_ticket(t)
            classified.setdefault(theme, []).append(t)

        # Build theme analyses
        themes: list[ThemeAnalysis] = []
        for theme_name, theme_tickets in sorted(classified.items()):
            severities = [SEVERITY_WEIGHTS.get(t["severity"], 1) for t in theme_tickets]
            avg_sev = sum(severities) / len(severities) if severities else 0
            total_arr = sum(t["arr"] for t in theme_tickets)
            sample_ids = [t["id"] for t in theme_tickets[:5]]

            # Extract top keywords for this theme from ticket text
            text_blob = " ".join(f"{t['title']} {t['description']}" for t in theme_tickets).lower()
            kw_hits: dict[str, int] = {}
            for kw in THEME_KEYWORDS.get(theme_name, []):
                count = len(re.findall(re.escape(kw), text_blob))
                if count:
                    kw_hits[kw] = count
            top_keywords = sorted(kw_hits, key=kw_hits.get, reverse=True)[:6]  # type: ignore[arg-type]

            themes.append(
                ThemeAnalysis(
                    name=theme_name,
                    ticket_count=len(theme_tickets),
                    avg_severity=round(avg_sev, 2),
                    total_arr_impact=total_arr,
                    sample_tickets=sample_ids,
                    urgency_score=_urgency_score(avg_sev, total_arr, len(theme_tickets)),
                    keywords=top_keywords,
                )
            )

        # Priority ranking by urgency
        themes.sort(key=lambda th: th.urgency_score, reverse=True)
        priority_ranking = [th.name for th in themes]

        severity_dist = {"critical": 0, "high": 0, "medium": 0, "low": 0}
        total_arr_risk = 0
        for t in tickets:
            severity_dist[t["severity"]] += 1
            total_arr_risk += t["arr"]

        top_theme = themes[0] if themes else None
        key_insight = (
            f"The most urgent theme is '{top_theme.name}' with an urgency score of "
            f"{top_theme.urgency_score}, driven by {top_theme.ticket_count} tickets "
            f"totalling ${top_theme.total_arr_impact:,} ARR at risk."
            if top_theme
            else "No themes detected."
        )

        return Agent1Output(
            summary=(
                f"Analyzed {len(tickets)} synthetic tickets across {len(themes)} themes. "
                f"Total ARR at risk: ${total_arr_risk:,}. "
                f"Top priority: {priority_ranking[0] if priority_ranking else 'N/A'}."
            ),
            themes=themes,
            priority_ranking=priority_ranking,
            key_insight=key_insight,
            total_tickets_analyzed=len(tickets),
            severity_distribution=severity_dist,
            total_arr_at_risk=total_arr_risk,
        )
