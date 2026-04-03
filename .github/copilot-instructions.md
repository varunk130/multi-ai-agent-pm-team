# Multi AI Agent PM Team — GitHub Copilot Instructions

## Project Overview

This is a **Multi AI Agent Product Team** — a 6-agent orchestrated pipeline that transforms customer feedback into executive-ready strategy, PRDs, stakeholder communications, and data-driven recommendations.

**Built by Varun Kulkarni** with Claude Code and GitHub Copilot.

## Architecture

- **Frontend**: React 19 + Vite 7 + Tailwind CSS v4
- **State Management**: Custom hooks (usePipelineRunner, useTypewriter)
- **Components**: Zero external UI libraries — all custom-built
- **Data**: 100% synthetic — no real customer data anywhere

## Code Conventions

- Use ES module imports/exports
- Functional React components with hooks only (no class components)
- One component per file with named export
- Tailwind utility classes for styling, CSS custom properties for theming
- File naming: kebab-case for files, PascalCase for component names
- Use `const` by default, `let` when reassignment is needed, never `var`

## Agent Structure

Each agent in `agents/` has its own folder with:
- `README.md` — Role description, inputs, outputs, cognitive function
- `config.js` — Agent configuration (name, model, color theme)

## Security Requirements

- No API keys, tokens, or secrets in any file
- All customer data is synthetic and fictional
- No external API calls — demo uses pre-computed outputs
- Sanitize all user-facing rendered content

## Testing

- Run `npm run dev` for development
- Run `npm run build` to verify production build
- Run `npm run lint` for code quality checks
