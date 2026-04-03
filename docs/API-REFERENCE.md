# API Reference

## Overview

This document describes the internal data APIs used by the Multi AI Agent PM Team pipeline components.

**Built by Varun Kulkarni**

> **Note**: This is a frontend-only application. There are no external API endpoints. This reference describes the internal module exports used between components.

## Data Modules

### agentConfig.js

```javascript
import { AGENTS, PIPELINE_CONFIG } from './data/agentConfig.js';
```

#### `AGENTS` — Array of agent configuration objects

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique agent identifier |
| `number` | number | Agent position (1-6) |
| `name` | string | Display name |
| `model` | string | Claude model name |
| `color` | string | Theme color name |
| `colorHex` | string | Hex color value |
| `cognitiveFunction` | string | Cognitive specialization |
| `description` | string | Brief role description |
| `subSteps` | string[] | Processing phase labels |
| `processingTime` | number | Simulated duration (ms) |

#### `PIPELINE_CONFIG` — Pipeline metadata

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Pipeline display name |
| `version` | string | Version string |
| `author` | string | Author name |
| `totalAgents` | number | Count of agents |
| `inputSources` | object[] | Input data descriptions |

### feedbackData.js

```javascript
import { feedbackTickets, feedbackSummary } from './data/feedbackData.js';
```

#### `feedbackTickets` — Array of 50 synthetic tickets

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Ticket ID (T-001 to T-050) |
| `title` | string | Issue title |
| `customer` | string | Fictional company name |
| `severity` | enum | 'critical', 'high', 'medium', 'low' |
| `category` | string | Issue category |
| `arr` | number | Annual recurring revenue at risk |
| `description` | string | Detailed description |

### metricsData.js

```javascript
import { monthlyMetrics, metricDefinitions, metricsTrend } from './data/metricsData.js';
```

#### `monthlyMetrics` — 6-month time series

10 metrics tracked monthly: MRR, churn rate, NPS, DAU, feature adoption, support tickets, avg resolution hours, CSAT, trial conversion, expansion revenue.

## Hooks API

### usePipelineRunner()

Returns:

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | 'idle', 'running', 'complete' |
| `agentStates` | object | Map of agent ID → state object |
| `outputs` | object | Map of agent ID → output data |
| `elapsed` | number | Seconds since pipeline started |
| `completedCount` | number | Number of completed agents |
| `run()` | function | Start the pipeline |
| `reset()` | function | Reset to idle state |

### useTypewriter(text, options)

| Param | Type | Description |
|-------|------|-------------|
| `text` | string | Text to animate |
| `options.speed` | number | Ms per character (default: 15) |
| `options.enabled` | boolean | Enable animation (default: true) |

Returns: `{ displayedText, isComplete, skipToEnd }`

### useAgentStatus(agentConfig, agentState)

Returns: `{ label, dotColor, isActive, subStepText }`

### useTimer()

Returns: `{ elapsed, isRunning, start, stop, reset, formatTime }`
