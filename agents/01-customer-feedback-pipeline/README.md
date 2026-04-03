# 📥 Agent #1: Customer Feedback Pipeline

> **Built by [Varun Kulkarni](https://github.com/varunk130)**
> Part of the [Multi-AI Agent PM Team](../../README.md) orchestration system
> Compatible with Claude Code and GitHub Copilot

---

## Overview

The Customer Feedback Pipeline is the **first agent** in the six-agent orchestration chain. It serves as the ingestion and pattern-recognition layer, transforming 50 raw customer support tickets into structured, actionable intelligence. This agent is the foundation upon which every downstream decision is built — if the signal extraction here is noisy, the entire pipeline degrades.

This agent receives unstructured customer feedback (support tickets with free-text descriptions, severity ratings, customer names, and ARR values) and produces a clean, typed payload of theme clusters. Each cluster contains frequency counts, severity distributions, and ARR impact scores that downstream agents use for quantitative validation and strategic reasoning.

---

## Cognitive Function: Pattern Recognition

### What is Pattern Recognition in this context?

Pattern Recognition is the cognitive ability to **cluster unstructured text into actionable signal**. In a product management context, this means:

- **Identifying recurring themes** across dozens or hundreds of disparate customer complaints
- **Distinguishing signal from noise** — not every ticket represents a systemic issue
- **Weighting by business impact** — a theme affecting $10M ARR customers matters more than one affecting $100K ARR customers
- **Detecting emergent patterns** — themes that are new or accelerating in frequency

### Why this cognitive function for Agent #1?

The first step in any data-driven product decision is understanding what customers are actually saying. Raw support tickets are messy, repetitive, and often misleading in isolation. Pattern Recognition transforms this chaos into structured clusters that subsequent agents can validate with metrics, narrate for stakeholders, and act upon strategically.

### How the model achieves this

Claude Sonnet 4.5 excels at this task because it balances:
- **Speed**: Processing 50 tickets needs to be fast to keep the pipeline responsive
- **Nuance**: Understanding that "app crashes on upload" and "file upload fails intermittently" are the same theme
- **Structured output**: Producing clean JSON that matches the downstream data contract

---

## Model

| Property | Value |
|----------|-------|
| **Model** | Claude Sonnet 4.5 (`claude-sonnet-4-5`) |
| **Why this model** | Optimal balance of speed and intelligence for NLP categorization tasks |
| **Temperature** | Low (structured output priority) |
| **Token budget** | Moderate — input is 50 tickets, output is compressed theme clusters |

---

## Inputs

### Raw Customer Feedback Tickets

The agent receives an array of 50 synthetic customer support tickets. Each ticket follows this schema:

```typescript
interface FeedbackTicket {
  id: string;              // Unique ticket identifier (e.g., "TICKET-001")
  title: string;           // Short summary of the issue
  description: string;     // Full customer description (free text, 50-500 words)
  customer: string;        // Customer/company name
  severity: number;        // 1-5 scale (1 = minor inconvenience, 5 = critical blocker)
  arr: number;             // Annual Recurring Revenue of the customer in USD
  createdAt: string;       // ISO 8601 timestamp
  category?: string;       // Optional pre-assigned category (often inaccurate)
}
```

### Example Input (abbreviated)

```json
{
  "feedbackData": [
    {
      "id": "TICKET-001",
      "title": "Dashboard loading takes 30+ seconds",
      "description": "Our analytics dashboard has been incredibly slow for the past two weeks. Page load times exceed 30 seconds, and sometimes the dashboard times out entirely. This is affecting our daily standups because we rely on real-time metrics.",
      "customer": "Acme Corp",
      "severity": 4,
      "arr": 250000,
      "createdAt": "2024-11-15T09:30:00Z"
    },
    {
      "id": "TICKET-002",
      "title": "Export to CSV broken for large datasets",
      "description": "When trying to export reports with more than 10,000 rows, the CSV export either fails silently or produces a corrupted file...",
      "customer": "TechStart Inc",
      "severity": 3,
      "arr": 85000,
      "createdAt": "2024-11-14T14:22:00Z"
    }
  ]
}
```

---

## Outputs

### Theme Analysis

The agent produces a structured payload of theme clusters, ready for downstream consumption:

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

interface Theme {
  name: string;              // Human-readable theme name (e.g., "Performance Degradation")
  ticketCount: number;       // Number of tickets in this cluster
  avgSeverity: number;       // Average severity across tickets in this theme
  totalArrImpact: number;    // Sum of ARR for all affected customers
  sampleTickets: string[];   // Array of ticket IDs (3-5 representative examples)
  keywords: string[];        // Key terms that define this theme
  sentiment: string;         // Overall sentiment: "critical" | "frustrated" | "concerned" | "minor"
  trend: string;             // "increasing" | "stable" | "decreasing"
}
```

### Example Output (abbreviated)

```json
{
  "themeAnalysis": {
    "themes": [
      {
        "name": "Performance Degradation",
        "ticketCount": 12,
        "avgSeverity": 4.2,
        "totalArrImpact": 2850000,
        "sampleTickets": ["TICKET-001", "TICKET-007", "TICKET-023"],
        "keywords": ["slow", "loading", "timeout", "performance", "latency"],
        "sentiment": "critical",
        "trend": "increasing"
      },
      {
        "name": "Data Export Failures",
        "ticketCount": 8,
        "avgSeverity": 3.5,
        "totalArrImpact": 1200000,
        "sampleTickets": ["TICKET-002", "TICKET-015", "TICKET-041"],
        "keywords": ["export", "CSV", "download", "corrupt", "failed"],
        "sentiment": "frustrated",
        "trend": "stable"
      }
    ],
    "metadata": {
      "totalTicketsAnalyzed": 50,
      "totalThemesIdentified": 7,
      "analysisTimestamp": "2024-11-20T10:00:00Z",
      "modelUsed": "claude-sonnet-4-5"
    }
  }
}
```

---

## Pipeline Position

```
┌─────────────────────────────────┐
│  📥 Agent #1: Customer Feedback │  ◀── YOU ARE HERE
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
- **Nothing** — this is the entry point of the pipeline
- Receives raw feedback data from the orchestrator

### What comes after
- **Agent #2 (Data Scientist)** consumes `themeAnalysis` to cross-reference with product metrics

---

## Key Techniques

### 1. NLP Categorization
Leverages Claude's natural language understanding to group tickets by semantic similarity, not just keyword matching. "App crashes on upload" and "file upload fails intermittently" are recognized as the same theme.

### 2. Sentiment Analysis
Each theme receives a sentiment classification based on the emotional intensity and urgency of the constituent tickets. This goes beyond simple positive/negative to capture gradients like "critical," "frustrated," "concerned," and "minor."

### 3. Priority Scoring
Combines severity ratings with ARR impact to produce a business-weighted priority score. A severity-3 ticket from a $500K customer outweighs a severity-5 ticket from a $10K customer in ARR impact terms.

### 4. Theme Clustering
Groups related tickets into coherent themes using semantic similarity. The agent identifies both obvious clusters (many tickets about the same feature) and subtle patterns (different symptoms of the same root cause).

### 5. Trend Detection
Analyzes ticket timestamps to determine whether each theme is increasing, stable, or decreasing in frequency — a critical signal for prioritization.

---

## Configuration

See [`config.js`](./config.js) for the agent's runtime configuration including model selection, input/output mappings, and metadata.

---

## Security & Data Privacy

> ⚠️ **All data used in this pipeline is entirely synthetic.**

- No real customer data, company names, or ARR figures are used
- All 50 feedback tickets are AI-generated for demonstration purposes
- The pipeline is designed to showcase multi-agent orchestration patterns, not to process real customer data
- If adapting for production use, ensure compliance with your organization's data handling policies

---

## Running This Agent

This agent runs as part of the full pipeline orchestration. See the [main README](../../README.md) for setup and execution instructions.

```bash
# Run the full pipeline (recommended)
npm start

# Run this agent in isolation (for development/testing)
npm run agent:01
```

---

## Architecture Notes

- **Stateless**: Each invocation processes a fresh batch of tickets with no memory of previous runs
- **Deterministic output schema**: Downstream agents depend on the exact shape of `themeAnalysis`
- **Fail-safe defaults**: If a ticket cannot be categorized, it is placed in an "Uncategorized" theme rather than dropped

---

*Built by [Varun Kulkarni](https://github.com/varunk130) • Part of the Multi-AI Agent PM Team*
