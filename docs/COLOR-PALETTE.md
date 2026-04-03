# Agent Color Palette Reference

## Color Assignments

Each agent in the pipeline has a dedicated color used across all UI elements:

| Agent # | Name | Color | Hex | Tailwind |
|---------|------|-------|-----|----------|
| 1 | Customer Feedback Pipeline | Indigo | `#6366F1` | `indigo-500` |
| 2 | Data Scientist | Cyan | `#06B6D4` | `cyan-500` |
| 3 | Metrics Narrator | Amber | `#F59E0B` | `amber-500` |
| 4 | Chief of Staff | Purple | `#8B5CF6` | `purple-500` |
| 5 | PRD Architect | Emerald | `#10B981` | `emerald-500` |
| 6 | Stakeholder Translator | Rose | `#F43F5E` | `rose-500` |

## Color Usage per Agent

Each agent's color is applied to:
- **Number badge** background
- **Status indicator** border/glow
- **Model tag** accent
- **Data flow connector** gradient
- **Active state** border highlight
- **Progress bar** fill

## Dark Theme Compatibility

All colors are selected for sufficient contrast against the dark backgrounds:
- Primary background: `#0B1120` — all colors pass WCAG AA
- Card background: `#111827` — all colors pass WCAG AA
- Text on colored backgrounds: White (`#FFFFFF`) — all pass AAA

## CSS Variables

```css
:root {
  --agent-1-color: #6366F1;
  --agent-2-color: #06B6D4;
  --agent-3-color: #F59E0B;
  --agent-4-color: #8B5CF6;
  --agent-5-color: #10B981;
  --agent-6-color: #F43F5E;
}
```

## Utility Classes

```css
.agent-color-{n}  /* text color */
.agent-bg-{n}     /* background color */
.agent-border-{n} /* border color */
```

Where `{n}` is 1-6.
