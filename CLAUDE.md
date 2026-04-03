# Multi AI Agent PM Team — Claude Code Instructions

## Project Overview

This is a **Multi AI Agent Product Team** — a 6-agent orchestrated pipeline that transforms customer feedback into executive-ready strategy, PRDs, stakeholder communications, and data-driven recommendations.

**Built by Varun Kulkarni** with Claude Code and GitHub Copilot.

## Architecture

- **Frontend**: React 19 + Vite 7 + Tailwind CSS v4
- **Pattern**: Custom hooks for state management, no external UI libraries
- **Agents**: 6 sequential agents with typed structured outputs
- **Data**: All synthetic — no real customer data

## Key Files

- `src/hooks/usePipelineRunner.js` — Pipeline orchestration state machine
- `src/hooks/useTypewriter.js` — RAF-based typewriter effect
- `src/components/` — All React components (one per file)
- `src/data/` — Synthetic feedback, metrics, and pre-computed agent outputs
- `agents/` — Individual agent folders with dedicated READMEs

## Code Style

- ES modules with named exports
- Functional React components with hooks
- Tailwind utility classes + CSS custom properties
- kebab-case files, PascalCase components
- No inline styles — use Tailwind or CSS classes

## Security Rules

- **NEVER** commit API keys, tokens, or credentials
- **ALL** data must be synthetic — no real customer data
- **NO** external API calls in the demo — use pre-computed outputs
- Validate and sanitize all rendered content

## Agent Pipeline Order

1. Customer Feedback Pipeline → Pattern Recognition
2. Data Scientist → Quantitative Validation
3. Metrics Narrator → Synthesis
4. Chief of Staff → Strategic Reasoning
5. PRD Architect → Specification
6. Stakeholder Translator → Audience Adaptation
