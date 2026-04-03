# 📖 Agent #3: Metrics Narrator

> **Built by [Varun Kulkarni](https://github.com/varunk130)**
> Part of the [Multi-AI Agent PM Team](../../README.md) orchestration system
> Compatible with Claude Code and GitHub Copilot

---

## Overview

The Metrics Narrator is the **third agent** in the six-agent orchestration chain. It serves as the synthesis layer, transforming raw correlations and statistical findings from Agents #1 and #2 into a **strategic narrative** that humans can act upon. Numbers don't drive decisions — stories do. This agent bridges the gap between data and action.

The Metrics Narrator takes the full upstream context (theme clusters from Agent #1, statistical correlations from Agent #2) and produces an executive narrative with leading indicators, risk assessments, and opportunity scores. Its output is designed to be consumed by both AI agents (Agent #4) and human stakeholders.

---

## Cognitive Function: Synthesis

### What is Synthesis in this context?

Synthesis is the cognitive ability to **convert numbers into a story that drives decisions**. In a product management context, this means:

- **Connecting disparate data points** into a coherent narrative arc
- **Identifying leading indicators** — metrics that predict future outcomes before they materialize
- **Distinguishing signal from noise** at the narrative level — which findings are strategically important?
- **Framing data for decision-making** — presenting numbers in a way that makes the right action obvious

### Why this cognitive function for Agent #3?

Agents #1 and #2 produce excellent raw material — theme clusters, correlations, cohort analyses. But this data is fragmented and statistical in nature. A product leader looking at "correlation strength: 0.84, p-value: 0.001" needs to understand what that *means* for the business. Synthesis turns "churn correlated with performance at 0.84" into "We are losing $420K MRR/quarter because our dashboard takes 30 seconds to load, and the problem is accelerating."

### How the model achieves this

Claude Sonnet 4.5 is well-suited for synthesis because it can:
- **Hold large context windows**: The full output of Agents #1 and #2 needs to be in context simultaneously
- **Generate structured prose**: Producing narrative that is both readable and machine-parseable
- **Identify non-obvious connections**: Linking a churn correlation with a feature adoption decline to identify a leading indicator

---

## Model

| Property | Value |
|----------|-------|
| **Model** | Claude Sonnet 4.5 (`claude-sonnet-4-5`) |
| **Why this model** | Excellent narrative generation with strong analytical grounding |
| **Temperature** | Moderate (balance between creativity and precision) |
| **Token budget** | High — needs full upstream context plus room for detailed narrative output |

---

## Inputs

### Full Upstream Context from Agents 1-2

The Metrics Narrator receives the complete output chain:

```typescript
interface MetricsNarratorInput {
  // From Agent #1
  themeAnalysis: {
    themes: Theme[];
    metadata: AnalysisMetadata;
  };

  // From Agent #2
  correlations: Correlation[];
  cohortAnalysis: CohortResult[];
  funnelAnalysis: FunnelResult[];
}
```

This is the first agent in the chain to receive **accumulated context** — it sees everything that Agents #1 and #2 produced, enabling cross-referencing and deeper pattern identification.

### Example Input (abbreviated)

```json
{
  "themeAnalysis": {
    "themes": [
      { "name": "Performance Degradation", "ticketCount": 12, "avgSeverity": 4.2, "totalArrImpact": 2850000 },
      { "name": "Data Export Failures", "ticketCount": 8, "avgSeverity": 3.5, "totalArrImpact": 1200000 }
    ]
  },
  "correlations": [
    {
      "theme": "Performance Degradation",
      "metric": "churn",
      "correlationStrength": 0.84,
      "insight": "Strong positive correlation between performance complaints and churn increase"
    }
  ]
}
```

---

## Outputs

### Executive Narrative

```typescript
interface NarrativeOutput {
  narrative: {
    executiveSummary: string;       // 2-3 paragraph executive overview
    keyFindings: KeyFinding[];      // Prioritized list of findings
    leadingIndicators: Indicator[]; // Metrics that predict future outcomes
    riskFactors: RiskFactor[];      // Identified risks with probability and impact
    opportunityScore: number;       // 0-100 composite opportunity score
  };
  metadata: {
    upstreamAgents: string[];
    contextTokensUsed: number;
    narrativeTimestamp: string;
  };
}

interface KeyFinding {
  title: string;                    // One-line finding headline
  evidence: string;                 // Supporting data summary
  impact: string;                   // Business impact statement
  urgency: string;                  // "immediate" | "near-term" | "strategic"
  confidenceLevel: number;          // 0-1 confidence in this finding
}

interface Indicator {
  metric: string;                   // The leading indicator metric
  currentTrend: string;             // What the metric is currently doing
  predictedOutcome: string;         // What this trend predicts
  timeHorizon: string;              // How far ahead this indicator looks
  actionability: string;            // What can be done about it
}

interface RiskFactor {
  risk: string;                     // Description of the risk
  probability: string;              // "high" | "medium" | "low"
  impact: string;                   // "critical" | "significant" | "moderate" | "minor"
  mitigation: string;               // Suggested mitigation approach
  relatedThemes: string[];          // Which themes contribute to this risk
}
```

### Example Output (abbreviated)

```json
{
  "narrative": {
    "executiveSummary": "Analysis of 50 customer support tickets cross-referenced with 6 months of product metrics reveals a critical pattern: performance degradation is the dominant driver of our accelerating churn rate. The data shows a 0.84 correlation between performance complaints and customer churn, with enterprise customers (>$100K ARR) being 3.2x more likely to be affected. If unaddressed, current trends project an additional $1.7M in annual churn within 2 quarters.\n\nThe good news: this is a solvable problem with a clear ROI. Our funnel analysis identifies the dashboard loading step as the primary bottleneck, and the problem is concentrated in a specific technical area (large dataset queries). Fixing this would directly impact our highest-value customer segment.",
    "keyFindings": [
      {
        "title": "Performance is the #1 churn driver",
        "evidence": "0.84 correlation with churn, 12 tickets, $2.85M ARR at risk",
        "impact": "Projected $1.7M additional annual churn if unaddressed",
        "urgency": "immediate",
        "confidenceLevel": 0.92
      }
    ],
    "leadingIndicators": [
      {
        "metric": "Dashboard p95 load time",
        "currentTrend": "Increasing 15% month-over-month",
        "predictedOutcome": "If trend continues, expected 40% increase in performance-related churn within 2 quarters",
        "timeHorizon": "6 months",
        "actionability": "Directly addressable through infrastructure investment and query optimization"
      }
    ],
    "riskFactors": [
      {
        "risk": "Enterprise customer exodus",
        "probability": "high",
        "impact": "critical",
        "mitigation": "Prioritize performance improvements for large-dataset queries",
        "relatedThemes": ["Performance Degradation", "Data Export Failures"]
      }
    ]
  }
}
```

---

## Pipeline Position

```
┌─────────────────────────────────┐
│  📥 Agent #1: Customer Feedback │
│     Pipeline                    │
│  Pattern Recognition            │
└──────────────┬──────────────────┘
               │ themeAnalysis
               ▼
┌─────────────────────────────────┐
│  📊 Agent #2: Data Scientist    │
│  Quantitative Validation        │
└──────────────┬──────────────────┘
               │ correlations
               ▼
┌─────────────────────────────────┐
│  📖 Agent #3: Metrics Narrator  │  ◀── YOU ARE HERE
│  Synthesis                      │
└──────────────┬──────────────────┘
               │ narrative
               ▼
┌─────────────────────────────────┐
│  🧠 Agent #4: Chief of Staff    │
│  Strategic Reasoning            │
└──────────────┬──────────────────┘
               │ strategicRecommendation
               ▼
┌─────────────────────────────────┐
│  📋 Agent #5: PRD Architect     │
│  Specification                  │
└──────────────┬──────────────────┘
               │ prd
               ▼
┌─────────────────────────────────┐
│  📣 Agent #6: Stakeholder       │
│     Translator                  │
│  Audience Adaptation            │
└─────────────────────────────────┘
```

### What comes before
- **Agent #1 (Customer Feedback Pipeline)** provides `themeAnalysis`
- **Agent #2 (Data Scientist)** provides `correlations`, `cohortAnalysis`, `funnelAnalysis`

### What comes after
- **Agent #4 (Chief of Staff)** consumes the narrative to perform strategic reasoning and trade-off analysis

---

## Key Techniques

### 1. Narrative Construction
Transforms statistical correlations into a coherent business story with a clear beginning (problem identification), middle (evidence presentation), and end (projected impact and recommended direction).

### 2. Trend Synthesis
Combines multiple data points across themes, metrics, and time periods to identify macro-trends that no single data point reveals. For example, linking declining NPS with increasing churn and rising support volume into a unified "platform reliability crisis" narrative.

### 3. Leading/Lagging Indicator Identification
Distinguishes between metrics that *predict* future outcomes (leading indicators like p95 load time trending up) and metrics that *confirm* past outcomes (lagging indicators like churn rate). Prioritizes leading indicators for actionability.

### 4. Risk Quantification
Converts qualitative risk assessments into structured risk factors with probability, impact, and mitigation strategies — making risks concrete and actionable rather than vague warnings.

### 5. Opportunity Scoring
Produces a composite 0-100 opportunity score that synthesizes urgency, addressability, ROI potential, and strategic alignment into a single signal for downstream decision-making.

---

## Configuration

See [`config.js`](./config.js) for the agent's runtime configuration including model selection, input/output mappings, and metadata.

---

## Security & Data Privacy

> ⚠️ **All data used in this pipeline is entirely synthetic.**

- No real customer data, product metrics, or business narratives are used
- All findings, correlations, and narratives are AI-generated for demonstration purposes
- The pipeline is designed to showcase multi-agent orchestration patterns, not to process real data
- If adapting for production use, ensure compliance with your organization's data handling policies

---

## Running This Agent

This agent runs as part of the full pipeline orchestration. See the [main README](../../README.md) for setup and execution instructions.

```bash
# Run the full pipeline (recommended)
npm start

# Run this agent in isolation (for development/testing)
npm run agent:03
```

---

## Architecture Notes

- **Context accumulation**: First agent to receive the full output of both upstream agents
- **Dual audience**: Output is consumed by both AI agents (Agent #4) and can be read directly by humans
- **Narrative quality gate**: The executive summary is designed to be copy-pasteable into a Slack message or email

---

*Built by [Varun Kulkarni](https://github.com/varunk130) • Part of the Multi-AI Agent PM Team*
