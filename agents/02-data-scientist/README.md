# 📊 Agent #2: Data Scientist

> **Built by [Varun Kulkarni](https://github.com/varunk130)**
> Part of the [Multi-AI Agent PM Team](../../README.md) orchestration system
> Compatible with Claude Code and GitHub Copilot

---

## Overview

The Data Scientist is the **second agent** in the six-agent orchestration chain. It serves as the quantitative validation layer, taking the qualitative theme clusters from Agent #1 and cross-referencing them against 6 months of hard product metrics. The goal is simple but critical: **confirm or deny qualitative signals with statistical evidence**.

Customer feedback tells you what people *say* is wrong. Metrics tell you what *actually* is wrong. This agent bridges that gap by running correlation analysis, cohort segmentation, and funnel analysis to determine which feedback themes are backed by measurable impact — and which are noise.

---

## Cognitive Function: Quantitative Validation

### What is Quantitative Validation in this context?

Quantitative Validation is the cognitive ability to **confirm qualitative signals with statistical evidence**. In a product management context, this means:

- **Correlation analysis**: Do customers who report "performance issues" actually show lower engagement metrics?
- **Cohort segmentation**: Are the customers experiencing this issue concentrated in a specific segment (enterprise vs. SMB, new vs. tenured)?
- **Funnel analysis**: At which step in the user journey does the reported problem manifest in drop-off data?
- **Confidence intervals**: How confident are we that the correlation is real and not coincidental?

### Why this cognitive function for Agent #2?

Product managers are constantly at risk of **recency bias** — the loudest customer complaint feels like the most important problem. Quantitative Validation acts as a counterweight by requiring statistical evidence before a theme advances in priority. A theme with 12 tickets but no metric correlation is less actionable than a theme with 5 tickets and a strong correlation to churn.

### How the model achieves this

Claude Sonnet 4.5 is used here for its ability to:
- **Process structured data**: Interpreting metric tables, time-series data, and statistical outputs
- **Generate statistical reasoning**: Producing correlation strengths, confidence intervals, and cohort comparisons
- **Maintain context**: Holding the full theme analysis from Agent #1 while processing 6 months of metrics

---

## Model

| Property | Value |
|----------|-------|
| **Model** | Claude Sonnet 4.5 (`claude-sonnet-4-5`) |
| **Why this model** | Strong analytical reasoning with efficient processing of structured metric data |
| **Temperature** | Low (statistical precision required) |
| **Token budget** | High — large context needed for 6 months of metrics + theme analysis |

---

## Inputs

### 1. Theme Analysis (from Agent #1)

The structured output from the Customer Feedback Pipeline:

```typescript
interface ThemeAnalysis {
  themes: Theme[];
  metadata: {
    totalTicketsAnalyzed: number;
    totalThemesIdentified: number;
    analysisTimestamp: string;
    modelUsed: string;
  };
}
```

### 2. Product Metrics (6 months)

Six months of product performance data across key metric categories:

```typescript
interface ProductMetrics {
  mrr: MonthlyMetric[];         // Monthly Recurring Revenue over 6 months
  churn: MonthlyMetric[];       // Customer churn rate by month
  nps: MonthlyMetric[];         // Net Promoter Score trends
  dau: MonthlyMetric[];         // Daily Active Users (aggregated monthly)
  featureAdoption: FeatureMetric[]; // Adoption rates for key features
  supportVolume: MonthlyMetric[];   // Support ticket volume trends
}

interface MonthlyMetric {
  month: string;        // "2024-06", "2024-07", etc.
  value: number;        // Metric value
  change: number;       // Month-over-month change (percentage)
}

interface FeatureMetric {
  feature: string;      // Feature name
  adoptionRate: number; // Percentage of users using the feature
  trend: string;        // "increasing" | "stable" | "decreasing"
  monthlyData: MonthlyMetric[];
}
```

### Example Input (abbreviated)

```json
{
  "themeAnalysis": { "...from Agent #1..." },
  "productMetrics": {
    "mrr": [
      { "month": "2024-06", "value": 2450000, "change": 3.2 },
      { "month": "2024-07", "value": 2520000, "change": 2.9 },
      { "month": "2024-08", "value": 2580000, "change": 2.4 },
      { "month": "2024-09", "value": 2610000, "change": 1.2 },
      { "month": "2024-10", "value": 2625000, "change": 0.6 },
      { "month": "2024-11", "value": 2630000, "change": 0.2 }
    ],
    "churn": [
      { "month": "2024-06", "value": 2.1, "change": -0.3 },
      { "month": "2024-11", "value": 3.8, "change": 0.5 }
    ]
  }
}
```

---

## Outputs

### Correlations and Statistical Analysis

```typescript
interface DataScienceOutput {
  correlations: Correlation[];
  cohortAnalysis: CohortResult[];
  funnelAnalysis: FunnelResult[];
  metadata: {
    metricsTimeRange: string;
    totalCorrelationsFound: number;
    highConfidenceCount: number;
    analysisTimestamp: string;
  };
}

interface Correlation {
  theme: string;               // Theme name from Agent #1
  metric: string;              // Which product metric correlates
  correlationStrength: number; // -1.0 to 1.0 (Pearson-style)
  confidenceInterval: string;  // e.g., "95% CI: [0.72, 0.91]"
  pValue: number;              // Statistical significance
  insight: string;             // Human-readable explanation of the correlation
  direction: string;           // "positive" | "negative" | "inverse"
}

interface CohortResult {
  theme: string;
  cohorts: {
    segment: string;           // e.g., "Enterprise", "SMB", "New (<6mo)", "Tenured (>2yr)"
    impactScore: number;       // 0-10 scale
    sampleSize: number;
    keyFinding: string;
  }[];
}

interface FunnelResult {
  theme: string;
  funnel: {
    step: string;              // e.g., "Dashboard Load", "Data Query", "Report Generation"
    dropOffRate: number;       // Percentage of users who abandon at this step
    correlation: number;       // Correlation to the theme
  }[];
  bottleneck: string;          // The step with highest correlation to the theme
}
```

### Example Output (abbreviated)

```json
{
  "correlations": [
    {
      "theme": "Performance Degradation",
      "metric": "churn",
      "correlationStrength": 0.84,
      "confidenceInterval": "95% CI: [0.72, 0.91]",
      "pValue": 0.001,
      "insight": "Strong positive correlation between performance complaints and churn rate increase. Churn spiked from 2.1% to 3.8% over the same period that performance tickets tripled.",
      "direction": "positive"
    },
    {
      "theme": "Performance Degradation",
      "metric": "dau",
      "correlationStrength": -0.76,
      "confidenceInterval": "95% CI: [-0.85, -0.62]",
      "pValue": 0.003,
      "insight": "Inverse correlation: as performance tickets increased, daily active users declined by 12% over 3 months.",
      "direction": "inverse"
    }
  ],
  "cohortAnalysis": [
    {
      "theme": "Performance Degradation",
      "cohorts": [
        {
          "segment": "Enterprise (>$100K ARR)",
          "impactScore": 8.5,
          "sampleSize": 23,
          "keyFinding": "Enterprise customers are 3.2x more likely to report performance issues, likely due to larger dataset sizes"
        }
      ]
    }
  ]
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
│  📊 Agent #2: Data Scientist    │  ◀── YOU ARE HERE
│  Quantitative Validation        │
└──────────────┬──────────────────┘
               │ correlations
               ▼
┌─────────────────────────────────┐
│  📖 Agent #3: Metrics Narrator  │
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
- **Agent #1 (Customer Feedback Pipeline)** provides `themeAnalysis` — structured theme clusters from raw tickets

### What comes after
- **Agent #3 (Metrics Narrator)** consumes the correlations and cohort analysis to build a strategic narrative

---

## Key Techniques

### 1. Correlation Analysis
Measures the statistical relationship between feedback themes and product metrics. Uses Pearson-style correlation coefficients with confidence intervals to quantify how strongly a customer complaint maps to an actual metric movement.

### 2. Cohort Segmentation
Breaks down impact by customer segment (Enterprise vs. SMB, new vs. tenured, high-ARR vs. low-ARR) to identify whether a theme disproportionately affects a specific cohort — critical for prioritization.

### 3. Funnel Analysis
Maps feedback themes to specific steps in the user journey to identify where the reported problem manifests in actual user behavior. This reveals bottlenecks that may not be obvious from ticket text alone.

### 4. Time-Series Trend Detection
Analyzes 6 months of metric data to identify whether correlations are strengthening, weakening, or stable over time. A strengthening correlation is a leading indicator of future impact.

### 5. Statistical Significance Testing
Every correlation includes a p-value and confidence interval to prevent false positives. Only statistically significant correlations are surfaced to downstream agents.

---

## Configuration

See [`config.js`](./config.js) for the agent's runtime configuration including model selection, input/output mappings, and metadata.

---

## Security & Data Privacy

> ⚠️ **All data used in this pipeline is entirely synthetic.**

- No real customer data, product metrics, or business figures are used
- All metrics are AI-generated for demonstration purposes
- The pipeline is designed to showcase multi-agent orchestration patterns, not to process real data
- If adapting for production use, ensure compliance with your organization's data handling policies

---

## Running This Agent

This agent runs as part of the full pipeline orchestration. See the [main README](../../README.md) for setup and execution instructions.

```bash
# Run the full pipeline (recommended)
npm start

# Run this agent in isolation (for development/testing)
npm run agent:02
```

---

## Architecture Notes

- **Context accumulation**: This agent receives the full output of Agent #1 plus its own metric dataset
- **Statistical rigor**: Correlations below a confidence threshold are excluded from output
- **Deterministic schema**: Downstream agents depend on the exact shape of `correlations[]`, `cohortAnalysis[]`, and `funnelAnalysis[]`

---

*Built by [Varun Kulkarni](https://github.com/varunk130) • Part of the Multi-AI Agent PM Team*
