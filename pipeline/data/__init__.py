"""
Synthetic data modules for the Multi AI Agent PM Team pipeline.
All data is 100% fictional — no real customers, companies, or metrics.
"""

from pipeline.data.feedback_data import SYNTHETIC_TICKETS, get_feedback_summary
from pipeline.data.metrics_data import MONTHLY_METRICS, compute_trend_analysis

__all__ = ["SYNTHETIC_TICKETS", "get_feedback_summary", "MONTHLY_METRICS", "compute_trend_analysis"]
