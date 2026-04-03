"""
Synthetic product metrics data for the Multi AI Agent PM Team pipeline.

Six months of fictional product metrics. All values are fabricated for
demonstration purposes — no real company data.

Built by Varun Kulkarni.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class MonthlyMetrics:
    """Typed container for a single month's metrics."""

    month: str
    nps: float
    churn_rate: float
    support_tickets: int
    feature_adoption: float
    response_time_hours: float
    csat: float
    mrr: int
    active_users: int


MONTHLY_METRICS: list[dict[str, Any]] = [
    {
        "month": "Oct 2023",
        "nps": 42,
        "churn_rate": 2.1,
        "support_tickets": 340,
        "feature_adoption": 67,
        "response_time_hours": 4.2,
        "csat": 78,
        "mrr": 2_850_000,
        "active_users": 12_400,
    },
    {
        "month": "Nov 2023",
        "nps": 39,
        "churn_rate": 2.4,
        "support_tickets": 380,
        "feature_adoption": 65,
        "response_time_hours": 4.8,
        "csat": 76,
        "mrr": 2_820_000,
        "active_users": 12_100,
    },
    {
        "month": "Dec 2023",
        "nps": 36,
        "churn_rate": 2.8,
        "support_tickets": 420,
        "feature_adoption": 62,
        "response_time_hours": 5.1,
        "csat": 73,
        "mrr": 2_780_000,
        "active_users": 11_800,
    },
    {
        "month": "Jan 2024",
        "nps": 34,
        "churn_rate": 3.1,
        "support_tickets": 460,
        "feature_adoption": 60,
        "response_time_hours": 5.5,
        "csat": 71,
        "mrr": 2_740_000,
        "active_users": 11_500,
    },
    {
        "month": "Feb 2024",
        "nps": 31,
        "churn_rate": 3.4,
        "support_tickets": 510,
        "feature_adoption": 58,
        "response_time_hours": 6.2,
        "csat": 68,
        "mrr": 2_690_000,
        "active_users": 11_100,
    },
    {
        "month": "Mar 2024",
        "nps": 28,
        "churn_rate": 3.8,
        "support_tickets": 550,
        "feature_adoption": 55,
        "response_time_hours": 6.8,
        "csat": 65,
        "mrr": 2_640_000,
        "active_users": 10_700,
    },
]


def compute_trend_analysis() -> dict[str, Any]:
    """Compute trend analysis across all 6 months of synthetic metrics."""
    if len(MONTHLY_METRICS) < 2:
        return {"error": "Insufficient data for trend analysis"}

    first = MONTHLY_METRICS[0]
    last = MONTHLY_METRICS[-1]
    n_months = len(MONTHLY_METRICS)

    def trend_direction(start: float, end: float) -> str:
        delta = end - start
        if abs(delta) < 0.5:
            return "stable"
        return "improving" if delta > 0 else "declining"

    def pct_change(start: float, end: float) -> float:
        if start == 0:
            return 0.0
        return round(((end - start) / abs(start)) * 100, 2)

    nps_values = [m["nps"] for m in MONTHLY_METRICS]
    churn_values = [m["churn_rate"] for m in MONTHLY_METRICS]
    ticket_values = [m["support_tickets"] for m in MONTHLY_METRICS]
    adoption_values = [m["feature_adoption"] for m in MONTHLY_METRICS]
    csat_values = [m["csat"] for m in MONTHLY_METRICS]
    mrr_values = [m["mrr"] for m in MONTHLY_METRICS]
    user_values = [m["active_users"] for m in MONTHLY_METRICS]

    def avg(values: list) -> float:
        return round(sum(values) / len(values), 2)

    trends = {
        "period": f"{first['month']} — {last['month']}",
        "months_analyzed": n_months,
        "nps": {
            "start": first["nps"],
            "end": last["nps"],
            "change": pct_change(first["nps"], last["nps"]),
            "direction": trend_direction(first["nps"], last["nps"]),
            "average": avg(nps_values),
        },
        "churn_rate": {
            "start": first["churn_rate"],
            "end": last["churn_rate"],
            "change": pct_change(first["churn_rate"], last["churn_rate"]),
            "direction": "worsening" if last["churn_rate"] > first["churn_rate"] else "improving",
            "average": avg(churn_values),
        },
        "support_tickets": {
            "start": first["support_tickets"],
            "end": last["support_tickets"],
            "change": pct_change(first["support_tickets"], last["support_tickets"]),
            "direction": "worsening" if last["support_tickets"] > first["support_tickets"] else "improving",
            "average": avg(ticket_values),
        },
        "feature_adoption": {
            "start": first["feature_adoption"],
            "end": last["feature_adoption"],
            "change": pct_change(first["feature_adoption"], last["feature_adoption"]),
            "direction": trend_direction(first["feature_adoption"], last["feature_adoption"]),
            "average": avg(adoption_values),
        },
        "csat": {
            "start": first["csat"],
            "end": last["csat"],
            "change": pct_change(first["csat"], last["csat"]),
            "direction": trend_direction(first["csat"], last["csat"]),
            "average": avg(csat_values),
        },
        "mrr": {
            "start": first["mrr"],
            "end": last["mrr"],
            "change": pct_change(first["mrr"], last["mrr"]),
            "direction": trend_direction(first["mrr"], last["mrr"]),
            "average": avg(mrr_values),
        },
        "active_users": {
            "start": first["active_users"],
            "end": last["active_users"],
            "change": pct_change(first["active_users"], last["active_users"]),
            "direction": trend_direction(first["active_users"], last["active_users"]),
            "average": avg(user_values),
        },
        "overall_health": "declining",
        "alert_level": "high",
        "summary": (
            "All key product health metrics show a declining trend over the 6-month period. "
            "NPS dropped from 42 to 28, churn nearly doubled from 2.1% to 3.8%, and support "
            "tickets increased 62%. Immediate intervention recommended."
        ),
    }
    return trends
