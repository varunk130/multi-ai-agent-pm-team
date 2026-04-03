# Data Contracts

## Overview

Each agent in the pipeline produces a structured output that downstream agents consume. This document defines the data contracts between agents.

**Built by Varun Kulkarni**

## Contract Principle

Agents communicate via **typed structured payloads**, not raw text. This ensures:
- Reliable parsing by downstream agents
- Clear interface boundaries
- Testable contracts
- Independent agent development

## Agent 1: Customer Feedback Pipeline

### Input
```javascript
{
  tickets: Array<{
    id: string,
    title: string,
    customer: string,
    severity: 'critical' | 'high' | 'medium' | 'low',
    category: string,
    arr: number,
    description: string
  }>
}
```

### Output
```javascript
{
  summary: string,
  themes: Array<{
    name: string,
    ticketCount: number,
    avgSeverity: string,
    totalArrImpact: number,
    sampleTickets: string[],
    urgencyScore: number
  }>,
  priorityRanking: string[],
  keyInsight: string
}
```

## Agent 2: Data Scientist

### Input
- Agent 1 output (themes)
- Product metrics (6-month time series)

### Output
```javascript
{
  summary: string,
  correlations: Array<{
    theme: string,
    metric: string,
    correlationStrength: number,
    confidenceInterval: string,
    insight: string
  }>,
  cohortAnalysis: {
    highChurnCohort: string,
    stableCohort: string
  },
  funnelAnalysis: object,
  statisticalSummary: string
}
```

## Agent 3: Metrics Narrator

### Input
- Agent 1 output
- Agent 2 output

### Output
```javascript
{
  executiveSummary: string,      // markdown formatted
  keyFindings: Array<{
    title: string,
    evidence: string,
    implication: string
  }>,
  leadingIndicators: Array<{
    indicator: string,
    currentTrend: string,
    prediction: string
  }>,
  riskFactors: Array<{
    risk: string,
    probability: string,
    impact: string,
    mitigation: string
  }>,
  opportunityScore: {
    score: number,
    rationale: string
  }
}
```

## Agent 4: Chief of Staff

### Input
- Agents 1-3 outputs (full upstream context)

### Output
```javascript
{
  strategicRecommendation: string,
  options: Array<{
    name: string,
    description: string,
    pros: string[],
    cons: string[],
    timelineWeeks: number,
    estimatedImpact: string,
    confidenceLevel: string
  }>,
  recommendation: {
    selectedOption: string,
    rationale: string,
    quickWins: string[]
  },
  premortem: {
    whatCouldGoWrong: string[],
    mitigations: string[]
  },
  resourceRequirements: {
    engineering: string,
    design: string,
    pm: string,
    timeline: string
  }
}
```

## Agent 5: PRD Architect

### Input
- Agent 4 recommendation + full upstream context

### Output
```javascript
{
  title: string,
  version: string,
  author: string,
  content: string   // full markdown PRD
}
```

## Agent 6: Stakeholder Translator

### Input
- Agent 5 PRD + full upstream context

### Output
```javascript
{
  communications: {
    engineering: Communication,
    executive: Communication,
    board: Communication,
    customer: Communication,
    sales: Communication
  }
}

// where Communication =
{
  audience: string,
  subject: string,
  tone: string,
  content: string,     // markdown
  keyPoints: string[],
  callToAction: string
}
```

## Disclaimer

All example data in contracts is synthetic. No real customer data.
