"""
Tests for the synthetic data modules.

Validates ticket completeness, severity distribution, ARR calculations,
and metrics data integrity.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest

from pipeline.data.feedback_data import SYNTHETIC_TICKETS, get_feedback_summary
from pipeline.data.metrics_data import MONTHLY_METRICS, compute_trend_analysis


class TestSyntheticTickets:
    def test_exactly_50_tickets(self):
        assert len(SYNTHETIC_TICKETS) == 50

    def test_all_tickets_have_required_fields(self):
        required = {"id", "title", "customer", "severity", "category", "arr", "description"}
        for ticket in SYNTHETIC_TICKETS:
            assert required.issubset(ticket.keys()), f"Missing fields in {ticket['id']}"

    def test_unique_ids(self):
        ids = [t["id"] for t in SYNTHETIC_TICKETS]
        assert len(ids) == len(set(ids)), "Duplicate ticket IDs found"

    def test_severity_values_valid(self):
        valid = {"critical", "high", "medium", "low"}
        for t in SYNTHETIC_TICKETS:
            assert t["severity"] in valid, f"Invalid severity in {t['id']}"

    def test_arr_values_positive(self):
        for t in SYNTHETIC_TICKETS:
            assert t["arr"] > 0, f"Non-positive ARR in {t['id']}"

    def test_severity_distribution(self):
        summary = get_feedback_summary()
        dist = summary["severity_distribution"]
        assert sum(dist.values()) == 50


class TestFeedbackSummary:
    def test_summary_structure(self):
        summary = get_feedback_summary()
        assert "total_tickets" in summary
        assert "severity_distribution" in summary
        assert "total_arr_at_risk" in summary
        assert "average_arr" in summary
        assert "weighted_avg_severity" in summary
        assert "top_categories" in summary

    def test_total_arr_reasonable(self):
        summary = get_feedback_summary()
        # 50 tickets × avg ~$1.5M = ~$75M
        assert 20_000_000 < summary["total_arr_at_risk"] < 200_000_000

    def test_weighted_severity_in_range(self):
        summary = get_feedback_summary()
        assert 1.0 <= summary["weighted_avg_severity"] <= 4.0


class TestMonthlyMetrics:
    def test_exactly_6_months(self):
        assert len(MONTHLY_METRICS) == 6

    def test_all_metrics_have_required_fields(self):
        required = {
            "month", "nps", "churn_rate", "support_tickets",
            "feature_adoption", "response_time_hours", "csat", "mrr", "active_users",
        }
        for m in MONTHLY_METRICS:
            assert required.issubset(m.keys()), f"Missing fields in {m['month']}"

    def test_nps_declining_trend(self):
        nps_values = [m["nps"] for m in MONTHLY_METRICS]
        assert nps_values[0] > nps_values[-1], "NPS should show declining trend"

    def test_churn_increasing_trend(self):
        churn_values = [m["churn_rate"] for m in MONTHLY_METRICS]
        assert churn_values[-1] > churn_values[0], "Churn should show increasing trend"


class TestTrendAnalysis:
    def test_trend_analysis_structure(self):
        trends = compute_trend_analysis()
        assert "period" in trends
        assert "nps" in trends
        assert "churn_rate" in trends
        assert "overall_health" in trends

    def test_overall_health_declining(self):
        trends = compute_trend_analysis()
        assert trends["overall_health"] == "declining"

    def test_nps_change_negative(self):
        trends = compute_trend_analysis()
        assert trends["nps"]["change"] < 0
