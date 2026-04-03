# Pipeline Orchestration

## Overview

The pipeline orchestration engine manages the sequential execution of 6 AI agents, handling state transitions, timing, sub-step cycling, and output accumulation.

**Built by Varun Kulkarni**

## State Machine

### Pipeline States

| State | Description |
|-------|-------------|
| `idle` | Pipeline hasn't run yet, or has been reset |
| `running` | Pipeline is actively executing agents |
| `complete` | All 6 agents have finished processing |

### Agent States

| State | Description |
|-------|-------------|
| `idle` | Agent hasn't started |
| `waiting` | Agent is queued (pipeline running, but this agent hasn't started yet) |
| `processing` | Agent is actively processing (sub-steps cycling) |
| `complete` | Agent has finished and output is available |

### State Transitions

```
Pipeline: idle → running → complete
                  ↑           │
                  └── reset ──┘

Agent:    idle → waiting → processing → complete
```

## Execution Flow

```
User clicks "Run Pipeline"
    │
    ├── Set pipeline status = running
    ├── Start elapsed timer
    ├── Set ALL agents to "waiting"
    │
    ├── Agent 1: Customer Feedback Pipeline
    │   ├── Set status = processing
    │   ├── Cycle through 6 sub-steps (4s total)
    │   ├── Set status = complete
    │   └── Store output
    │
    ├── Agent 2: Data Scientist
    │   ├── Set status = processing
    │   ├── Cycle through 6 sub-steps (5s total)
    │   ├── Set status = complete
    │   └── Store output
    │
    ├── Agent 3: Metrics Narrator
    │   ├── Set status = processing
    │   ├── Cycle through 6 sub-steps (3.5s total)
    │   ├── Set status = complete
    │   └── Store output
    │
    ├── Agent 4: Chief of Staff
    │   ├── Set status = processing
    │   ├── Cycle through 6 sub-steps (6s total)
    │   ├── Set status = complete
    │   └── Store output
    │
    ├── Agent 5: PRD Architect
    │   ├── Set status = processing
    │   ├── Cycle through 6 sub-steps (5.5s total)
    │   ├── Set status = complete
    │   └── Store output
    │
    └── Agent 6: Stakeholder Translator
        ├── Set status = processing
        ├── Cycle through 6 sub-steps (4.5s total)
        ├── Set status = complete
        └── Store output

    Stop timer
    Set pipeline status = complete
```

## Sub-Step Cycling

Each agent has 6 sub-steps that cycle during processing. The sub-step interval is calculated as:

```
stepDuration = agent.processingTime / agent.subSteps.length
```

For example, Agent 1 has 4000ms processing time and 6 sub-steps, so each sub-step displays for ~667ms.

## Implementation Details

The orchestration is implemented in `usePipelineRunner.js` as a React hook that:

1. Manages a state object for each agent
2. Uses `setInterval` for sub-step cycling within each agent
3. Uses `async/await` with Promises for sequential agent execution
4. Tracks elapsed time with a separate interval
5. Stores outputs in a map keyed by agent ID
6. Provides `run()` and `reset()` callbacks

## Total Pipeline Duration

| Agent | Processing Time |
|-------|----------------|
| 1. Customer Feedback Pipeline | 4.0s |
| 2. Data Scientist | 5.0s |
| 3. Metrics Narrator | 3.5s |
| 4. Chief of Staff | 6.0s |
| 5. PRD Architect | 5.5s |
| 6. Stakeholder Translator | 4.5s |
| **Total** | **28.5s** |
