"""
Multi AI Agent PM Team — Python Pipeline.

Sequential agent orchestration for product management workflows.
Built by Varun Kulkarni. Works with Claude Code and GitHub Copilot.

All data is 100% synthetic and fictional. No real customer data.
No API keys or secrets are stored in source code.
"""

__version__ = "1.0.0"
__author__ = "Varun Kulkarni"

from pipeline.config import PipelineConfig
from pipeline.orchestrator import PipelineOrchestrator

__all__ = ["PipelineConfig", "PipelineOrchestrator", "__version__", "__author__"]
