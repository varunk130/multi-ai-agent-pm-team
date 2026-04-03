# Architecture

## System Overview

The Multi AI Agent PM Team is a React-based frontend application that simulates a 6-agent AI pipeline for product management workflows.

**Built by Varun Kulkarni** — Works with Claude Code & GitHub Copilot.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    React 19 App                       │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │  │
│  │  │   App.jsx   │  │   Layout    │  │   Pipeline   │  │  │
│  │  │  (root)     │──│  (2-panel)  │──│   Header     │  │  │
│  │  └─────────────┘  └─────────────┘  └──────────────┘  │  │
│  │         │                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              State Layer (Hooks)                 │  │  │
│  │  │                                                 │  │  │
│  │  │  usePipelineRunner  ← orchestration engine      │  │  │
│  │  │  useTypewriter      ← text animation            │  │  │
│  │  │  useAgentStatus     ← status derivation         │  │  │
│  │  │  useTimer           ← elapsed time tracking     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │         │                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              Data Layer (Static)                 │  │  │
│  │  │                                                 │  │  │
│  │  │  agentConfig.js     ← 6 agent definitions       │  │  │
│  │  │  feedbackData.js    ← 50 synthetic tickets      │  │  │
│  │  │  metricsData.js     ← 6-month metric trends     │  │  │
│  │  │  agent[1-6]Output   ← pre-computed results      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Build Layer                           │  │
│  │  Vite 7 + Tailwind CSS v4 + HMR                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── PipelineHeader
│   ├── TimerDisplay
│   ├── MetricBadge (completion count)
│   └── RunButton (run/reset)
├── Layout
│   ├── [left] PipelineView
│   │   ├── InputDataPanel
│   │   ├── ProgressStepper
│   │   └── AgentNode × 6
│   │       ├── StatusDot
│   │       ├── ModelBadge
│   │       └── SubStepIndicator
│   │   └── DataFlowConnector × 5
│   └── [right] AgentDetailPanel
│       ├── AgentOutputTabs
│       └── MarkdownRenderer
└── Toast
```

## Data Flow

1. **Static data** is loaded from `src/data/` modules at import time
2. **usePipelineRunner** manages the state machine for all 6 agents
3. When "Run" is clicked, agents execute sequentially with simulated delays
4. Each agent transitions: `idle → waiting → processing → complete`
5. Sub-steps cycle within each agent's processing phase
6. On completion, pre-computed output is loaded into the outputs store
7. Clicking an agent node shows its output in the detail panel

## State Machine

```
          ┌──────────────────────────────────────────┐
          │                                          │
  [idle] ──→ [waiting] ──→ [processing] ──→ [complete]
          │                     │                    │
          │              (sub-step cycling)           │
          │                     │                    │
          └─────── [reset] ─────┘                    │
                      ↑                              │
                      └──────────────────────────────┘
```

## Design Decisions

### Why Pre-Computed Outputs?
- Deterministic demo experience
- No API key requirements
- Focus on orchestration patterns, not LLM inference
- Instant load with no rate limits

### Why Custom Markdown Renderer?
- Full control over dark theme styling
- Table, code block, and blockquote support within cards
- No heavy library dependencies
- Consistent rendering across the application

### Why Zero UI Libraries?
- Precise control over the dark theme aesthetic
- No style conflicts or overrides
- Smaller bundle size
- Every interaction purpose-built for the use case

## Security Architecture

- No backend, no API calls, no data transmission
- All data is static and synthetic
- No user authentication required
- No cookies or local storage for sensitive data
- CSP-compatible build output
