# Design System

## Overview

The Multi AI Agent PM Team uses a custom dark theme design system built with Tailwind CSS v4 and CSS custom properties. Zero external UI libraries.

**Built by Varun Kulkarni**

## Color Palette

### Background Layers

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0B1120` | Page background |
| `--color-bg-secondary` | `#111827` | Card backgrounds |
| `--color-bg-tertiary` | `#1E293B` | Elevated surfaces, code blocks |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#F1F5F9` | Headlines, important text |
| `--color-text-secondary` | `#94A3B8` | Body text, descriptions |
| `--color-text-muted` | `#64748B` | Subtle labels, timestamps |

### Agent Colors

Each agent has a distinct theme color:

| Agent | Color | Hex | CSS Variable |
|-------|-------|-----|-------------|
| 1. Customer Feedback Pipeline | Indigo | `#6366F1` | `--agent-1-color` |
| 2. Data Scientist | Cyan | `#06B6D4` | `--agent-2-color` |
| 3. Metrics Narrator | Amber | `#F59E0B` | `--agent-3-color` |
| 4. Chief of Staff | Purple | `#8B5CF6` | `--agent-4-color` |
| 5. PRD Architect | Emerald | `#10B981` | `--agent-5-color` |
| 6. Stakeholder Translator | Rose | `#F43F5E` | `--agent-6-color` |

## Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Antialiasing**: `-webkit-font-smoothing: antialiased`

## Component Patterns

### Cards
```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
```

### Status Indicators
- **Idle**: Gray dot
- **Waiting**: Yellow dot with subtle pulse
- **Processing**: Blue dot with spin animation
- **Complete**: Green dot with bounce-in

### Agent Badges
Number badges use the agent's theme color as background with white text. Model badges use a subtle background tint.

## Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| `pulse-glow` | 2s | Active agent background |
| `spin-slow` | 2s | Processing spinner |
| `slide-in-right` | 0.3s | Detail panel entrance |
| `fade-in` | 0.3s | Content appearance |
| `flow-dot` | 1.5s | Data flow connector dots |
| `bounce-in` | 0.5s | Completion indicators |

## Spacing

Uses Tailwind's default spacing scale (4px base):
- Card padding: `p-4` (16px)
- Section gaps: `gap-4` to `gap-6`
- Header height: 64px fixed
