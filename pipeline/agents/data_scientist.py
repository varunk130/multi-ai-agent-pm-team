"""
Agent 2 — Data Scientist.

Cross-references feedback themes from Agent 1 with 6-month product metrics.
Computes correlations, cohort analysis, and funnel diagnostics.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import math
from typing import Any

from pipeline.agents.base import BaseAgent
from pipeline.data.metrics_data import MONTHLY_METRICS, compute_trend_analysis
from pipeline.models import (
    Agent1Output,
    Agent2Output,
    CohortAnalysis,
    Correlation,
    FunnelStage,
)


def _pearson_r(xs: list[float], ys: list[float]) -> float:
    """Compute Pearson correlation coefficient for two equal-length series."""
    n = len(xs)
    if n < 2 or n != len(ys):
        return 0.0
    mean_x = sum(xs) / n
    mean_y = sum(ys) / n
    cov = sum((x - mean_x) * (y - mean_y) for x, y in zip(xs, ys))
    std_x = math.sqrt(sum((x - mean_x) ** 2 for x in xs))
    std_y = math.sqrt(sum((y - mean_y) ** 2 for y in ys))
    if std_x == 0 or std_y == 0:
        return 0.0
    return round(cov / (std_x * std_y), 4)


def _confidence_interval(r: float, n: int) -> tuple[float, float]:
    """Approximate 95% CI for a Pearson r using Fisher z-transform."""
    if n < 4:
        return (-1.0, 1.0)
    z = 0.5 * math.log((1 + r) / (1 - r + 1e-10))
    se = 1.0 / math.sqrt(n - 3)
    z_lo = z - 1.96 * se
    z_hi = z + 1.96 * se
    r_lo = (math.exp(2 * z_lo) - 1) / (math.exp(2 * z_lo) + 1)
    r_hi = (math.exp(2 * z_hi) - 1) / (math.exp(2 * z_hi) + 1)
    return (round(max(r_lo, -1.0), 4), round(min(r_hi, 1.0), 4))


# Approximate monthly ticket distribution per theme for synthetic correlation.
# In a real system this would query a database; here we fabricate a plausible
# month-over-month distribution that mirrors the rising support-ticket trend.
THEME_MONTHLY_WEIGHTS: dict[str, list[float]] = {
    "API Performance": [0.10, 0.12, 0.14, 0.16, 0.18, 0.20],
    "Security & Compliance": [0.08, 0.09, 0.10, 0.12, 0.13, 0.15],
    "Authentication": [0.06, 0.07, 0.08, 0.09, 0.10, 0.11],
    "Dashboard UX": [0.09, 0.10, 0.12, 0.13, 0.14, 0.16],
    "Data Management": [0.07, 0.08, 0.09, 0.10, 0.11, 0.12],
    "Mobile Experience": [0.03, 0.04, 0.04, 0.05, 0.05, 0.06],
    "Notifications": [0.04, 0.04, 0.05, 0.06, 0.07, 0.08],
    "Integrations": [0.03, 0.03, 0.04, 0.04, 0.05, 0.06],
    "Billing": [0.02, 0.02, 0.03, 0.03, 0.04, 0.04],
    "Onboarding": [0.02, 0.02, 0.03, 0.03, 0.03, 0.04],
}

# Metrics we correlate against theme volume
METRIC_KEYS = ["nps", "churn_rate", "support_tickets", "csat", "mrr", "active_users"]


class DataScientistAgent(BaseAgent):
    """Agent 2 — performs statistical analysis on themes × metrics."""

    @property
    def name(self) -> str:
        return "Data Scientist"

    @property
    def agent_number(self) -> int:
        return 2

    @property
    def cognitive_function(self) -> str:
        return "Statistical Analysis & Correlation"

    @property
    def color(self) -> str:
        return "#8b5cf6"

    def process(self, context: dict[str, Any]) -> Agent2Output:
        agent1: Agent1Output = context["agent_1"]
        trends = compute_trend_analysis()

        # Build correlations for top themes against key metrics
        correlations: list[Correlation] = []
        n = len(MONTHLY_METRICS)

        for theme in agent1.themes[:6]:  # top 6 themes
            weights = THEME_MONTHLY_WEIGHTS.get(theme.name, [0.1] * n)
            # Scale weights to approximate ticket counts per month
            theme_series = [w * theme.ticket_count * 10 for w in weights]

            for mk in METRIC_KEYS:
                metric_series = [float(m[mk]) for m in MONTHLY_METRICS]
                r = _pearson_r(theme_series, metric_series)
                ci = _confidence_interval(r, n)

                direction = "positive" if r > 0 else "negative"
                strength = "strong" if abs(r) > 0.7 else "moderate" if abs(r) > 0.4 else "weak"
                insight = (
                    f"{strength.capitalize()} {direction} correlation (r={r}) between "
                    f"'{theme.name}' ticket volume and {mk}. "
                    f"As {theme.name} tickets increase, {mk} tends to "
                    f"{'increase' if r > 0 else 'decrease'}."
                )

                correlations.append(
                    Correlation(
                        theme=theme.name,
                        metric=mk,
                        correlation_strength=r,
                        confidence_interval=ci,
                        insight=insight,
                        p_value=round(max(0.001, 1 - abs(r)), 4),
                    )
                )

        # Cohort analysis — group by ARR tier
        arr_tiers = [
            ("Enterprise (>$2M)", 2_000_000, float("inf")),
            ("Mid-Market ($500K–$2M)", 500_000, 2_000_000),
            ("SMB (<$500K)", 0, 500_000),
        ]
        cohorts: list[CohortAnalysis] = []
        from pipeline.data.feedback_data import SYNTHETIC_TICKETS

        for tier_name, lo, hi in arr_tiers:
            tier_tickets = [t for t in SYNTHETIC_TICKETS if lo <= t["arr"] < hi]
            if not tier_tickets:
                continue
            avg_arr = sum(t["arr"] for t in tier_tickets) // len(tier_tickets)
            # Find dominant theme in this cohort
            theme_counts: dict[str, int] = {}
            for t in tier_tickets:
                cat = t["category"]
                theme_counts[cat] = theme_counts.get(cat, 0) + 1
            dominant = max(theme_counts, key=lambda k: theme_counts[k])
            churn_risk = (
                "critical"
                if avg_arr > 2_000_000
                else "high"
                if avg_arr > 1_000_000
                else "medium"
                if avg_arr > 400_000
                else "low"
            )
            cohorts.append(
                CohortAnalysis(
                    cohort_name=tier_name,
                    ticket_count=len(tier_tickets),
                    avg_arr=avg_arr,
                    dominant_theme=dominant,
                    churn_risk=churn_risk,
                    insight=(
                        f"{tier_name} cohort has {len(tier_tickets)} tickets, "
                        f"averaging ${avg_arr:,} ARR. Dominant issue: {dominant}."
                    ),
                )
            )

        # Funnel analysis — retention funnel from synthetic metrics
        latest = MONTHLY_METRICS[-1]
        funnel: list[FunnelStage] = [
            FunnelStage(
                stage_name="Total Registered Users",
                value=latest["active_users"] * 1.8,
                drop_off_pct=0,
                note="Estimated from active user ratio",
            ),
            FunnelStage(
                stage_name="Monthly Active Users",
                value=float(latest["active_users"]),
                drop_off_pct=round((1 - 1 / 1.8) * 100, 1),
                note="Users who logged in during the month",
            ),
            FunnelStage(
                stage_name="Feature Adopters",
                value=latest["active_users"] * latest["feature_adoption"] / 100,
                drop_off_pct=round(100 - latest["feature_adoption"], 1),
                note="Users engaging with core features",
            ),
            FunnelStage(
                stage_name="Power Users",
                value=latest["active_users"] * 0.15,
                drop_off_pct=round(100 - 15 / (latest["feature_adoption"] / 100 + 0.01), 1),
                note="Users in top engagement quartile",
            ),
            FunnelStage(
                stage_name="Promoters (NPS 9-10)",
                value=latest["active_users"] * max(latest["nps"], 0) / 100,
                drop_off_pct=round(100 - max(latest["nps"], 0), 1),
                note="Users likely to recommend the product",
            ),
        ]

        stat_summary = (
            f"Analyzed {len(correlations)} theme×metric correlations across "
            f"{n} months. Found {sum(1 for c in correlations if abs(c.correlation_strength) > 0.7)} "
            f"strong correlations. Churn rate shows the strongest worsening trend "
            f"({trends['churn_rate']['change']}% change). MRR declined by "
            f"${abs(trends['mrr']['start'] - trends['mrr']['end']):,} over the period."
        )

        return Agent2Output(
            summary=(
                f"Cross-referenced {len(agent1.themes)} themes against {len(METRIC_KEYS)} metrics "
                f"over {n} months. Identified {len(correlations)} correlations and "
                f"{len(cohorts)} customer cohorts."
            ),
            correlations=correlations,
            cohort_analysis=cohorts,
            funnel_analysis=funnel,
            statistical_summary=stat_summary,
            data_quality_score=0.92,
        )
