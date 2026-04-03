# 📣 Agent #6: Stakeholder Translator

> **Built by [Varun Kulkarni](https://github.com/varunk130)**
> Part of the [Multi-AI Agent PM Team](../../README.md) orchestration system
> Compatible with Claude Code and GitHub Copilot

---

## Overview

The Stakeholder Translator is the **sixth and final agent** in the six-agent orchestration chain. It serves as the communication layer, transforming the PRD and full upstream context into **five audience-tailored communications** — one for each key stakeholder group. The same initiative, framed five different ways for five different audiences.

This agent embodies a critical product management truth: **the best strategy fails without effective communication**. An engineering team needs technical specifics. An executive needs business impact. A board needs strategic narrative. A customer success team needs talking points. A sales team needs competitive positioning. This agent produces all five from a single source of truth.

---

## Cognitive Function: Audience Adaptation

### What is Audience Adaptation in this context?

Audience Adaptation is the cognitive ability to **reframe the same information for different stakeholders**. In a product management context, this means:

- **Information hierarchy reframing**: Each audience cares about different aspects — leading with what matters to *them*
- **Tone calibration**: Technical precision for engineering, strategic framing for executives, empathy for customer-facing teams
- **Detail level adjustment**: Board communications are concise and metric-driven; engineering briefs are detailed and specification-heavy
- **Call-to-action customization**: Each audience needs a different ask — engineers need to estimate and plan, executives need to approve resources, sales needs to update pitches

### Why this cognitive function for Agent #6?

The pipeline has produced excellent analytical and strategic output through Agents #1–5. But that output is in a format optimized for AI consumption and PM review — not for cross-functional distribution. Each stakeholder group has different context, different priorities, and different decision-making frameworks. Audience Adaptation ensures that the right message reaches the right audience in the right format.

### How the model achieves this

Claude Sonnet 4.5 excels at this task because it can:
- **Maintain source fidelity**: All five communications trace back to the same data — no information drift
- **Shift registers**: Switching between technical, executive, and customer-facing communication styles
- **Extract relevant subsets**: Pulling the right data points for each audience from the full context
- **Generate diverse formats**: Producing briefs, memos, talking points, and email-ready copy

---

## Model

| Property | Value |
|----------|-------|
| **Model** | Claude Sonnet 4.5 (`claude-sonnet-4-5`) |
| **Why this model** | Excellent at tone adaptation and multi-format generation with consistent quality |
| **Temperature** | Moderate (balance between consistency and natural-sounding communication) |
| **Token budget** | Very high — producing 5 distinct communications from full upstream context |

---

## Inputs

### PRD + Full Upstream Context

The Stakeholder Translator receives the **complete pipeline output**:

```typescript
interface StakeholderTranslatorInput {
  // From Agent #1
  themeAnalysis: {
    themes: Theme[];
    metadata: AnalysisMetadata;
  };

  // From Agent #2
  correlations: Correlation[];
  cohortAnalysis: CohortResult[];
  funnelAnalysis: FunnelResult[];

  // From Agent #3
  narrative: {
    executiveSummary: string;
    keyFindings: KeyFinding[];
    leadingIndicators: Indicator[];
    riskFactors: RiskFactor[];
  };

  // From Agent #4
  strategicRecommendation: {
    options: StrategicOption[];
    recommendation: Recommendation;
    premortem: PremortermAnalysis;
    resourceRequirements: ResourceEstimate;
  };

  // From Agent #5
  prd: {
    title: string;
    problemStatement: ProblemStatement;
    userStories: UserStory[];
    acceptanceCriteria: AcceptanceCriterion[];
    technicalRequirements: TechnicalRequirements;
    successMetrics: SuccessMetric[];
    timeline: Timeline;
  };
}
```

This agent has the broadest context of any agent in the pipeline — it sees everything that was produced from raw tickets through to the final PRD.

---

## Outputs

### Five Audience-Tailored Communications

```typescript
interface StakeholderCommunications {
  communications: {
    engineering: Communication;
    executive: Communication;
    board: Communication;
    customer: Communication;
    sales: Communication;
  };
  metadata: {
    sourceDocument: string;
    audienceCount: number;
    generatedAt: string;
    upstreamAgents: string[];
  };
}

interface Communication {
  audience: string;               // Target audience name
  subject: string;                // Email/memo subject line
  body: string;                   // Full communication body (markdown formatted)
  keyPoints: string[];            // 3-5 bullet points summarizing the core message
  callToAction: string;           // Specific ask for this audience
  tone: string;                   // Description of the communication tone
  estimatedReadTime: string;      // e.g., "3 minutes"
}
```

### Communication Details by Audience

#### 🔧 Engineering
- **Focus**: Technical scope, architecture decisions, user stories, acceptance criteria, timeline
- **Tone**: Direct, technical, specification-oriented
- **Key content**: Performance targets, tech stack implications, phased milestones
- **Call to action**: Review the technical requirements and provide effort estimates

#### 👔 Executive Leadership
- **Focus**: Business impact, ROI, resource requirements, strategic alignment
- **Tone**: Concise, metric-driven, strategic
- **Key content**: Revenue at risk, projected ROI, competitive implications
- **Call to action**: Approve resource allocation and timeline

#### 📊 Board of Directors
- **Focus**: Strategic narrative, market position, risk assessment, financial impact
- **Tone**: High-level, forward-looking, governance-oriented
- **Key content**: ARR impact, churn trends, competitive moat, long-term vision
- **Call to action**: Acknowledge strategic direction and provide governance input

#### 💚 Customer Success
- **Focus**: Customer impact, timeline, talking points for affected customers
- **Tone**: Empathetic, solution-oriented, customer-first
- **Key content**: What customers are experiencing, what we're doing about it, when they'll see improvement
- **Call to action**: Prepare customer outreach with provided talking points

#### 💰 Sales
- **Focus**: Competitive positioning, objection handling, feature narrative for prospects
- **Tone**: Confident, value-oriented, forward-looking
- **Key content**: How this initiative strengthens our market position, talking points for prospect conversations
- **Call to action**: Update pitch decks and prepare responses for performance-related objections

### Example Output (abbreviated)

```json
{
  "communications": {
    "engineering": {
      "audience": "Engineering Team",
      "subject": "Technical Brief: Dashboard Performance Optimization — Q1 Priority",
      "body": "## Overview\n\nWe are prioritizing a dashboard performance optimization initiative based on strong data signals...",
      "keyPoints": [
        "P95 load time target: < 3 seconds (current: 32 seconds)",
        "3-phase approach over 12 weeks: Query optimization → Caching → Frontend",
        "Requires 2 senior + 2 mid-level engineers dedicated full-time",
        "Phase 1 checkpoint at week 6 — if no measurable improvement, escalate to architectural review"
      ],
      "callToAction": "Please review the attached user stories and acceptance criteria. Provide effort estimates by EOW Friday.",
      "tone": "Direct, technical, collaborative"
    },
    "executive": {
      "audience": "Executive Leadership",
      "subject": "Strategic Initiative: $1.7M ARR Protection Through Performance",
      "body": "## Executive Summary\n\nOur data-driven analysis of 50 customer support tickets cross-referenced with 6 months of product metrics...",
      "keyPoints": [
        "$2.85M ARR at immediate risk from performance-related churn",
        "0.84 correlation between performance complaints and customer churn",
        "Recommended 12-week initiative with projected ROI of 4.2x",
        "Requires reallocation of 4 engineers from roadmap features"
      ],
      "callToAction": "Approve the resource allocation of 4 engineers for 12 weeks, with a Phase 1 checkpoint at week 6.",
      "tone": "Concise, data-driven, action-oriented"
    },
    "board": {
      "audience": "Board of Directors",
      "subject": "Q1 Strategic Priority: Platform Reliability & Enterprise Retention",
      "body": "## Strategic Context\n\nOur enterprise customer segment — representing 68% of ARR — is experiencing platform performance issues...",
      "keyPoints": [
        "Enterprise churn increased from 2.1% to 3.8% over 6 months",
        "Root cause identified and addressable: dashboard performance degradation",
        "12-week remediation plan with clear milestones and kill criteria",
        "Investment: 4 engineers for 12 weeks; projected return: $1.7M ARR preserved"
      ],
      "callToAction": "No action required. This update is for strategic awareness. Full details available upon request.",
      "tone": "Strategic, measured, governance-appropriate"
    },
    "customer": {
      "audience": "Customer Success Team",
      "subject": "Customer Talking Points: Dashboard Performance Improvements Coming",
      "body": "## Background\n\nWe've heard our customers loud and clear — dashboard performance has not met expectations...",
      "keyPoints": [
        "We've identified the root cause and have a dedicated team working on it",
        "Customers will see measurable improvements within 6 weeks",
        "Enterprise customers with large datasets are the highest priority",
        "Proactive outreach recommended for top 10 affected accounts"
      ],
      "callToAction": "Begin proactive outreach to the top 10 affected enterprise accounts using the talking points above.",
      "tone": "Empathetic, transparent, solution-focused"
    },
    "sales": {
      "audience": "Sales Team",
      "subject": "Sales Enablement: Performance Initiative & Competitive Positioning",
      "body": "## What You Need to Know\n\nWe're making a major investment in platform performance...",
      "keyPoints": [
        "Performance improvements launching in Q1 — 10x faster dashboard loads",
        "Use this as a proof point: 'We invest in platform reliability, not just features'",
        "If prospects raise performance concerns, pivot to our data-driven improvement process",
        "Updated one-pager and competitive battle card attached"
      ],
      "callToAction": "Update your pitch decks to include the performance commitment slide. Reach out to any prospects who have raised performance objections in the past 90 days.",
      "tone": "Confident, forward-looking, enabling"
    }
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
│  📣 Agent #6: Stakeholder       │  ◀── YOU ARE HERE
│     Translator                  │
│  Audience Adaptation            │
└─────────────────────────────────┘
```

### What comes before
- **Agents #1–4** provide theme analysis, statistical correlations, strategic narrative, and recommendation
- **Agent #5 (PRD Architect)** provides the complete PRD with user stories, acceptance criteria, and timeline

### What comes after
- **Nothing** — this is the terminal agent in the pipeline
- Outputs are delivered to human stakeholders across 5 organizational functions

---

## Key Techniques

### 1. Audience Modeling
Each communication is built on a model of the target audience: what they care about, what they already know, what format they prefer, and what action they can take. This ensures relevance and reduces communication overhead.

### 2. Tone Adaptation
The same facts are presented with different linguistic registers:
- **Engineering**: Technical precision, specific metrics, implementation details
- **Executive**: ROI-focused, concise, decision-oriented
- **Board**: Strategic, high-level, governance-appropriate
- **Customer Success**: Empathetic, transparent, solution-focused
- **Sales**: Confident, enabling, competitive

### 3. Information Hierarchy Reframing
Each audience gets information ordered by *their* priority:
- Engineering leads with technical scope → timeline → constraints
- Executives lead with business impact → ROI → resource ask
- Board leads with strategic context → financial impact → risk
- Customer Success leads with customer experience → timeline → talking points
- Sales leads with competitive positioning → feature narrative → objection handling

### 4. Stakeholder Empathy Mapping
The agent considers each stakeholder's context, concerns, and decision-making framework when crafting communications. A board member reading a quarterly update has a fundamentally different mindset than an engineer reviewing a technical brief.

### 5. Single Source of Truth
All five communications trace back to the same upstream data. There is no information drift or inconsistency between audiences — only differences in emphasis, framing, and detail level. This ensures organizational alignment.

---

## Configuration

See [`config.js`](./config.js) for the agent's runtime configuration including model selection, input/output mappings, and metadata.

---

## Security & Data Privacy

> ⚠️ **All data used in this pipeline is entirely synthetic.**

- No real stakeholder communications, customer data, or business metrics are used
- All communications are AI-generated for demonstration purposes
- The pipeline is designed to showcase multi-agent orchestration patterns, not to produce real stakeholder communications
- If adapting for production use, ensure human review of all generated communications before distribution

---

## Running This Agent

This agent runs as part of the full pipeline orchestration. See the [main README](../../README.md) for setup and execution instructions.

```bash
# Run the full pipeline (recommended)
npm start

# Run this agent in isolation (for development/testing)
npm run agent:06
```

---

## Architecture Notes

- **Broadest context window**: Receives the complete output of all five upstream agents — the largest context in the pipeline
- **Terminal agent**: No downstream consumers — output goes directly to human stakeholders
- **Five parallel outputs**: Produces five independent communications from a single input, demonstrating audience-aware generation
- **Format flexibility**: Each communication is markdown-formatted and can be directly pasted into email, Slack, or document tools

---

*Built by [Varun Kulkarni](https://github.com/varunk130) • Part of the Multi-AI Agent PM Team*
