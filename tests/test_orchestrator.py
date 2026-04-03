"""
Tests for the pipeline orchestrator.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest

from pipeline.config import PipelineConfig
from pipeline.models import PipelineResult
from pipeline.orchestrator import PipelineOrchestrator


class TestOrchestratorInit:
    def test_default_initialization(self):
        orch = PipelineOrchestrator()
        assert len(orch.agents) == 6

    def test_agents_in_order(self):
        orch = PipelineOrchestrator()
        numbers = [a.agent_number for a in orch.agents]
        assert numbers == [1, 2, 3, 4, 5, 6]

    def test_custom_config(self):
        config = PipelineConfig()
        orch = PipelineOrchestrator(config)
        assert orch.config is config


class TestOrchestratorRun:
    def test_full_pipeline_run(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        assert isinstance(result, PipelineResult)
        assert result.status == "success"

    def test_all_agents_produce_output(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        assert len(result.agent_outputs) == 6

    def test_outputs_keyed_correctly(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        expected_keys = {f"agent_{i}" for i in range(1, 7)}
        assert set(result.agent_outputs.keys()) == expected_keys

    def test_timing_recorded(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        assert result.total_duration_ms > 0

    def test_timestamp_present(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        assert len(result.timestamp) > 0

    def test_no_errors_on_success(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        assert len(result.errors) == 0

    def test_result_serializable(self):
        orch = PipelineOrchestrator()
        result = orch.run(verbose=False)
        data = result.model_dump()
        assert isinstance(data, dict)
        assert "agent_outputs" in data


class TestOrchestratorGetOutput:
    def test_get_agent_output_after_run(self):
        orch = PipelineOrchestrator()
        orch.run(verbose=False)
        output = orch.get_agent_output(1)
        assert output is not None

    def test_get_nonexistent_output(self):
        orch = PipelineOrchestrator()
        output = orch.get_agent_output(99)
        assert output is None


class TestOrchestratorReset:
    def test_reset_clears_state(self):
        orch = PipelineOrchestrator()
        orch.run(verbose=False)
        assert orch.get_agent_output(1) is not None
        orch.reset()
        assert orch.get_agent_output(1) is None
