"""
Tests for Pydantic data models — validation, serialization, type enforcement.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest
from pydantic import ValidationError

from pipeline.models import (
    Agent1Output,
    Agent2Output,
    Agent3Output,
    Agent4Output,
    Agent5Output,
    Agent6Output,
    Correlation,
    FeedbackTicket,
    FunnelStage,
    KeyFinding,
    LeadingIndicator,
    MonthlyMetric,
    PipelineResult,
    PremortemItem,
    RiskFactor,
    StakeholderCommunication,
    StrategicOption,
    ThemeAnalysis,
    TechnicalRequirement,
    UserStory,
)


class TestFeedbackTicket:
    def test_valid_ticket(self):
        ticket = FeedbackTicket(
            id="TICKET-001",
            title="Test ticket title",
            customer="Acme Corp",
            severity="critical",
            category="API Performance",
            arr=1_000_000,
            description="Test description for the ticket",
        )
        assert ticket.id == "TICKET-001"
        assert ticket.severity == "critical"
        assert ticket.arr == 1_000_000

    def test_invalid_severity(self):
        with pytest.raises(ValidationError):
            FeedbackTicket(
                id="TICKET-X",
                title="Bad",
                customer="Corp",
                severity="unknown",  # type: ignore
                category="Test",
                arr=100,
                description="Desc",
            )

    def test_arr_exceeds_max(self):
        with pytest.raises(ValidationError):
            FeedbackTicket(
                id="TICKET-X",
                title="Expensive",
                customer="BigCo",
                severity="low",
                category="Test",
                arr=100_000_000,
                description="Way too much ARR",
            )

    def test_serialization_roundtrip(self):
        ticket = FeedbackTicket(
            id="T-RT",
            title="Roundtrip test",
            customer="TestCo",
            severity="medium",
            category="Test",
            arr=500_000,
            description="Testing serialization",
        )
        data = ticket.model_dump()
        restored = FeedbackTicket(**data)
        assert restored == ticket


class TestMonthlyMetric:
    def test_valid_metric(self):
        metric = MonthlyMetric(
            month="Jan 2024",
            nps=35,
            churn_rate=3.0,
            support_tickets=400,
            feature_adoption=60,
            response_time_hours=5.0,
            csat=70,
            mrr=2_800_000,
            active_users=11_000,
        )
        assert metric.nps == 35
        assert metric.mrr == 2_800_000

    def test_nps_out_of_range(self):
        with pytest.raises(ValidationError):
            MonthlyMetric(
                month="X", nps=200, churn_rate=1, support_tickets=10,
                feature_adoption=50, response_time_hours=1, csat=80,
                mrr=100, active_users=100,
            )


class TestThemeAnalysis:
    def test_valid_theme(self):
        theme = ThemeAnalysis(
            name="API Performance",
            ticket_count=10,
            avg_severity=3.2,
            total_arr_impact=5_000_000,
            sample_tickets=["T-1", "T-2"],
            urgency_score=75.5,
        )
        assert theme.urgency_score == 75.5
        assert len(theme.sample_tickets) == 2


class TestCorrelation:
    def test_valid_correlation(self):
        c = Correlation(
            theme="API Perf",
            metric="nps",
            correlation_strength=-0.85,
            confidence_interval=(-0.95, -0.70),
            insight="Strong negative correlation",
        )
        assert c.correlation_strength == -0.85

    def test_correlation_out_of_range(self):
        with pytest.raises(ValidationError):
            Correlation(
                theme="X",
                metric="Y",
                correlation_strength=1.5,
                confidence_interval=(0, 1),
                insight="Invalid",
            )


class TestStrategicOption:
    def test_valid_option(self):
        opt = StrategicOption(
            name="Option A",
            description="Full platform hardening initiative",
            pros=["Comprehensive"],
            cons=["Expensive"],
            timeline_weeks=12,
            estimated_impact="High impact expected",
        )
        assert opt.timeline_weeks == 12

    def test_timeline_too_long(self):
        with pytest.raises(ValidationError):
            StrategicOption(
                name="Bad",
                description="Too long timeline",
                pros=["A"],
                cons=["B"],
                timeline_weeks=200,
                estimated_impact="Nope",
            )


class TestStakeholderCommunication:
    def test_valid_communication(self):
        comm = StakeholderCommunication(
            audience="engineering",
            subject="Sprint Planning Brief",
            tone="technical",
            content="Detailed technical brief for the engineering team with specs.",
            key_points=["API fixes", "Security hardening"],
            call_to_action="Review PRD by Friday",
        )
        assert comm.audience == "engineering"
        assert len(comm.key_points) == 2

    def test_invalid_audience(self):
        with pytest.raises(ValidationError):
            StakeholderCommunication(
                audience="aliens",  # type: ignore
                subject="Hello",
                tone="formal",
                content="This should fail validation",
                key_points=["A"],
                call_to_action="Do something",
            )


class TestPipelineResult:
    def test_valid_result(self):
        result = PipelineResult(
            agent_outputs={"agent_1": {"summary": "test"}},
            total_duration_ms=1234.56,
            status="success",
        )
        assert result.status == "success"
        assert result.total_duration_ms == 1234.56

    def test_invalid_status(self):
        with pytest.raises(ValidationError):
            PipelineResult(
                agent_outputs={},
                total_duration_ms=100,
                status="unknown",  # type: ignore
            )
