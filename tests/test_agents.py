"""
Tests for all 6 pipeline agents — output validation, schema compliance,
context accumulation, and error handling.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest

from pipeline.agents.feedback_pipeline import FeedbackPipelineAgent
from pipeline.agents.data_scientist import DataScientistAgent
from pipeline.agents.metrics_narrator import MetricsNarratorAgent
from pipeline.agents.chief_of_staff import ChiefOfStaffAgent
from pipeline.agents.prd_architect import PRDArchitectAgent
from pipeline.agents.stakeholder_translator import StakeholderTranslatorAgent
from pipeline.models import (
    Agent1Output,
    Agent2Output,
    Agent3Output,
    Agent4Output,
    Agent5Output,
    Agent6Output,
)


class TestFeedbackPipelineAgent:
    def test_produces_valid_output(self):
        agent = FeedbackPipelineAgent()
        output = agent.run({})
        assert isinstance(output, Agent1Output)

    def test_output_has_themes(self, agent1_output):
        assert len(agent1_output.themes) > 0

    def test_all_50_tickets_analyzed(self, agent1_output):
        assert agent1_output.total_tickets_analyzed == 50

    def test_severity_distribution_sums(self, agent1_output):
        total = sum(agent1_output.severity_distribution.values())
        assert total == 50

    def test_priority_ranking_matches_themes(self, agent1_output):
        theme_names = {t.name for t in agent1_output.themes}
        ranking_names = set(agent1_output.priority_ranking)
        assert theme_names == ranking_names

    def test_arr_at_risk_positive(self, agent1_output):
        assert agent1_output.total_arr_at_risk > 0

    def test_urgency_scores_within_range(self, agent1_output):
        for theme in agent1_output.themes:
            assert 0 <= theme.urgency_score <= 100

    def test_no_upstream_required(self):
        agent = FeedbackPipelineAgent()
        assert agent.required_upstream_agents == []

    def test_agent_identity(self):
        agent = FeedbackPipelineAgent()
        assert agent.name == "Customer Feedback Pipeline"
        assert agent.agent_number == 1
        assert agent.cognitive_function == "Pattern Recognition & Synthesis"


class TestDataScientistAgent:
    def test_produces_valid_output(self, agent1_output):
        agent = DataScientistAgent()
        output = agent.run({"agent_1": agent1_output})
        assert isinstance(output, Agent2Output)

    def test_has_correlations(self, agent2_output):
        assert len(agent2_output.correlations) > 0

    def test_correlations_in_range(self, agent2_output):
        for c in agent2_output.correlations:
            assert -1.0 <= c.correlation_strength <= 1.0

    def test_has_cohort_analysis(self, agent2_output):
        assert len(agent2_output.cohort_analysis) > 0

    def test_has_funnel_analysis(self, agent2_output):
        assert len(agent2_output.funnel_analysis) > 0

    def test_missing_upstream_raises(self):
        agent = DataScientistAgent()
        with pytest.raises(ValueError, match="validation failed"):
            agent.run({})

    def test_agent_identity(self):
        agent = DataScientistAgent()
        assert agent.agent_number == 2


class TestMetricsNarratorAgent:
    def test_produces_valid_output(self, agent1_output, agent2_output):
        agent = MetricsNarratorAgent()
        output = agent.run({"agent_1": agent1_output, "agent_2": agent2_output})
        assert isinstance(output, Agent3Output)

    def test_has_key_findings(self, agent3_output):
        assert len(agent3_output.key_findings) >= 3

    def test_has_leading_indicators(self, agent3_output):
        assert len(agent3_output.leading_indicators) >= 2

    def test_has_risk_factors(self, agent3_output):
        assert len(agent3_output.risk_factors) >= 2

    def test_opportunity_score_in_range(self, agent3_output):
        assert 0 <= agent3_output.opportunity_score <= 100

    def test_executive_summary_not_empty(self, agent3_output):
        assert len(agent3_output.executive_summary) > 20

    def test_agent_identity(self):
        agent = MetricsNarratorAgent()
        assert agent.agent_number == 3


class TestChiefOfStaffAgent:
    def test_produces_valid_output(self, agent1_output, agent2_output, agent3_output):
        agent = ChiefOfStaffAgent()
        output = agent.run({
            "agent_1": agent1_output,
            "agent_2": agent2_output,
            "agent_3": agent3_output,
        })
        assert isinstance(output, Agent4Output)

    def test_has_multiple_options(self, agent4_output):
        assert len(agent4_output.options) >= 3

    def test_has_premortem(self, agent4_output):
        assert len(agent4_output.premortem) >= 3

    def test_has_recommendation(self, agent4_output):
        assert len(agent4_output.recommendation) > 10

    def test_resource_requirements_present(self, agent4_output):
        assert "engineering_headcount" in agent4_output.resource_requirements

    def test_agent_identity(self):
        agent = ChiefOfStaffAgent()
        assert agent.agent_number == 4


class TestPRDArchitectAgent:
    def test_produces_valid_output(
        self, agent1_output, agent2_output, agent3_output, agent4_output
    ):
        agent = PRDArchitectAgent()
        output = agent.run({
            "agent_1": agent1_output,
            "agent_2": agent2_output,
            "agent_3": agent3_output,
            "agent_4": agent4_output,
        })
        assert isinstance(output, Agent5Output)

    def test_has_user_stories(self, agent5_output):
        assert len(agent5_output.user_stories) >= 3

    def test_has_technical_requirements(self, agent5_output):
        assert len(agent5_output.technical_requirements) >= 5

    def test_prd_content_substantial(self, agent5_output):
        assert len(agent5_output.content) > 500

    def test_has_success_metrics(self, agent5_output):
        assert len(agent5_output.success_metrics) >= 3

    def test_agent_identity(self):
        agent = PRDArchitectAgent()
        assert agent.agent_number == 5


class TestStakeholderTranslatorAgent:
    def test_produces_valid_output(
        self, agent1_output, agent2_output, agent3_output, agent4_output, agent5_output
    ):
        agent = StakeholderTranslatorAgent()
        output = agent.run({
            "agent_1": agent1_output,
            "agent_2": agent2_output,
            "agent_3": agent3_output,
            "agent_4": agent4_output,
            "agent_5": agent5_output,
        })
        assert isinstance(output, Agent6Output)

    def test_has_five_communications(self, agent6_output):
        assert len(agent6_output.communications) == 5

    def test_all_audiences_covered(self, agent6_output):
        expected = {"engineering", "executive", "board", "customer", "sales"}
        assert set(agent6_output.communications.keys()) == expected

    def test_each_communication_has_content(self, agent6_output):
        for audience, comm in agent6_output.communications.items():
            assert len(comm.content) > 20, f"{audience} communication is too short"
            assert len(comm.key_points) >= 1

    def test_correct_tones(self, agent6_output):
        expected_tones = {
            "engineering": "technical",
            "executive": "strategic",
            "board": "formal",
            "customer": "empathetic",
            "sales": "persuasive",
        }
        for audience, expected_tone in expected_tones.items():
            assert agent6_output.communications[audience].tone == expected_tone

    def test_agent_identity(self):
        agent = StakeholderTranslatorAgent()
        assert agent.agent_number == 6


class TestContextAccumulation:
    """Test that context flows correctly through the pipeline."""

    def test_agent2_receives_agent1(self, agent1_output):
        agent = DataScientistAgent()
        # Should NOT raise
        output = agent.run({"agent_1": agent1_output})
        assert output is not None

    def test_agent3_requires_both_upstream(self, agent1_output):
        agent = MetricsNarratorAgent()
        # Missing agent_2 should fail validation
        with pytest.raises(ValueError):
            agent.run({"agent_1": agent1_output})

    def test_full_chain_succeeds(self):
        """Run the full chain sequentially and verify all outputs."""
        context = {}

        a1 = FeedbackPipelineAgent()
        context["agent_1"] = a1.run(context)
        assert isinstance(context["agent_1"], Agent1Output)

        a2 = DataScientistAgent()
        context["agent_2"] = a2.run(context)
        assert isinstance(context["agent_2"], Agent2Output)

        a3 = MetricsNarratorAgent()
        context["agent_3"] = a3.run(context)
        assert isinstance(context["agent_3"], Agent3Output)

        a4 = ChiefOfStaffAgent()
        context["agent_4"] = a4.run(context)
        assert isinstance(context["agent_4"], Agent4Output)

        a5 = PRDArchitectAgent()
        context["agent_5"] = a5.run(context)
        assert isinstance(context["agent_5"], Agent5Output)

        a6 = StakeholderTranslatorAgent()
        context["agent_6"] = a6.run(context)
        assert isinstance(context["agent_6"], Agent6Output)
