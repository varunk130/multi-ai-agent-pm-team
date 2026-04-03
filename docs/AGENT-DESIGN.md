# Agent Design Patterns

## Overview

This document describes the cognitive specialization pattern used in the 6-agent pipeline. Each agent is designed with a specific cognitive function, mirroring how high-performing product organizations distribute thinking across specialized roles.

**Built by Varun Kulkarni**

## The Cognitive Specialization Pattern

Rather than using a single large prompt to handle the entire workflow, this pipeline decomposes the task into 6 distinct cognitive functions:

| Agent | Cognitive Function | Analogy |
|-------|--------------------|---------|
| 1. Customer Feedback Pipeline | Pattern Recognition | Junior analyst sorting through data |
| 2. Data Scientist | Quantitative Validation | Statistician confirming hunches with data |
| 3. Metrics Narrator | Synthesis | Senior analyst writing the briefing |
| 4. Chief of Staff | Strategic Reasoning | VP of Product making the call |
| 5. PRD Architect | Specification | Staff PM writing the spec |
| 6. Stakeholder Translator | Audience Adaptation | Communications lead tailoring the message |

## Why Specialization Beats Monolithic Prompts

1. **Focused reasoning**: Each agent operates within a constrained problem space, reducing cognitive load and improving output quality.
2. **Typed contracts**: Structured outputs create reliable handoff points between agents.
3. **Debuggability**: When something goes wrong, you can identify exactly which cognitive step failed.
4. **Modularity**: Agents can be swapped, reordered, or parallelized without rewriting the entire pipeline.
5. **Context management**: Each agent receives precisely the context it needs, avoiding prompt bloat.

## Agent Design Template

Every agent in this pipeline follows a consistent design:

```
┌─────────────────────────────────────┐
│         Agent Configuration          │
│                                     │
│  Name: [human-readable name]        │
│  Model: [Claude Sonnet/Opus]        │
│  Cognitive Function: [specific]     │
│  Color: [theme color]               │
│                                     │
│  Inputs:  [typed upstream data]     │
│  Outputs: [typed structured data]   │
│  Sub-steps: [processing phases]     │
│  Processing Time: [simulated ms]    │
└─────────────────────────────────────┘
```

## Context Accumulation Strategy

A key design decision is **sequential context accumulation**:

- Agent 1 sees: raw feedback data
- Agent 2 sees: raw data + Agent 1 output
- Agent 3 sees: raw data + Agent 1 + Agent 2 outputs
- Agent 4 sees: raw data + Agents 1-3 outputs
- Agent 5 sees: raw data + Agents 1-4 outputs
- Agent 6 sees: raw data + Agents 1-5 outputs

This means later agents have richer context, enabling more sophisticated reasoning. The Chief of Staff (Agent 4) can identify strategic opportunities that emerge from the combination of qualitative patterns, quantitative correlations, and narrative synthesis — none of which any single upstream agent could produce alone.

## Model Selection Strategy

| Agents | Model | Rationale |
|--------|-------|-----------|
| 1, 2, 3, 6 | Claude Sonnet 4.5 | Fast, cost-effective for structured extraction and generation |
| 4, 5 | Claude Opus 4.6 | Maximum reasoning capability for strategic decisions and PRD generation |

The most critical cognitive functions (strategic reasoning and specification) use the most powerful model, while pattern recognition and audience adaptation use the faster model.

## Structured Output Contracts

Each agent produces a typed payload, not raw text. Example for Agent 1:

```javascript
{
  themes: [
    {
      name: "Performance & Scalability",
      ticketCount: 12,
      avgSeverity: "high",
      totalArrImpact: 985000,
      sampleTickets: ["Dashboard loading 30s+", "Queries timeout on 1M rows"],
      urgencyScore: 9.2
    }
  ],
  priorityRanking: ["Performance", "Security", "Integration"],
  keyInsight: "Performance issues affect 24% of tickets and 38% of total ARR at risk"
}
```

This ensures downstream agents receive clean, parseable data rather than having to extract structure from prose.

## Security & Data Privacy

All agent outputs are pre-computed and contain only synthetic data. No real customer information, business metrics, or proprietary data is used. See [SECURITY.md](../SECURITY.md) for full policy.
