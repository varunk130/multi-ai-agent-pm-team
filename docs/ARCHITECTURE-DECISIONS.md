# Agent Pipeline Architecture Decisions

## ADR-001: Pre-computed Outputs Over Live API Calls

### Status
Accepted

### Context
The pipeline could either make live API calls to Claude or use pre-computed outputs.

### Decision
Use pre-computed outputs stored as JavaScript modules.

### Consequences
- ✅ No API key required for demos
- ✅ Deterministic, reviewable output quality
- ✅ Zero cost per run
- ✅ Instant loading
- ❌ Outputs don't vary between runs
- ❌ Cannot demonstrate real-time streaming

---

## ADR-002: Sequential Over Parallel Agent Execution

### Status
Accepted

### Context
Agents could run in parallel or sequentially.

### Decision
Sequential execution with cumulative context.

### Consequences
- ✅ Each agent benefits from full upstream context
- ✅ Simpler state management
- ✅ Clear visualization of data flow
- ❌ Longer total pipeline time
- ❌ No opportunity for parallelism

---

## ADR-003: Custom Markdown Renderer

### Status
Accepted

### Context
Agent outputs contain markdown that needs rendering.

### Decision
Build a custom renderer instead of using react-markdown or similar libraries.

### Consequences
- ✅ Full control over dark theme styling
- ✅ No heavy dependencies
- ✅ Handles all needed MD features (tables, code, blockquotes)
- ❌ More code to maintain
- ❌ May miss edge cases in MD spec

---

## ADR-004: Zero External UI Libraries

### Status
Accepted

### Context
Could use Material UI, Radix, shadcn/ui, or similar.

### Decision
All components custom-built.

### Consequences
- ✅ Precise control over dark theme aesthetic
- ✅ Smaller bundle size
- ✅ No style conflicts
- ❌ More development time
- ❌ No pre-built accessibility patterns

---

## ADR-005: Agent Color System

### Status
Accepted

### Context
Need visual differentiation between 6 agents.

### Decision
Each agent gets a unique color from the Tailwind palette that flows through all its UI elements.

### Consequences
- ✅ Instant visual identification
- ✅ Beautiful data flow visualization
- ✅ Consistent design language
- ❌ Colors must have sufficient contrast in dark theme
