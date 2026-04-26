# Contributing to Multi AI Agent PM Team

Thanks for your interest in improving this project. The pipeline is opinionated and small enough that contributions are easy to land if they're focused.

## Local setup

```bash
git clone https://github.com/varunk130/multi-ai-agent-pm-team.git
cd multi-ai-agent-pm-team
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Branch and PR conventions

- Branch from `master` using a short descriptive slug, e.g. `fix-agent-3-context-overflow` or `add-agent-7-roadmap-planner`.
- Keep PRs small and focused. One agent change per PR is ideal.
- PR title format: `[<area>] <imperative summary>` — e.g. `[agent-4] Tighten Chief of Staff synthesis prompt`.
- Reference any related issue with `Closes #N` in the PR body.

## Code style

- TypeScript / React for frontend code; follow the existing ESLint config.
- Markdown agent prompts live under `agents/` with one folder per agent (`agents/01-feedback-synthesizer/` etc.).
- Keep agent prompts under 200 lines; split into includes if longer.

## Proposing a new agent

Each agent should:

1. Have a clearly defined **cognitive role** (one sentence).
2. Receive structured upstream context (not raw text).
3. Produce a structured output schema downstream agents can rely on.
4. Include at least one example input/output pair.

Open an issue first using the `[Agent Proposal]` prefix so the role can be discussed before implementation.

## Modifying existing agent prompts

- Include before/after example outputs in the PR description.
- Note any change to the structured output schema (this is a breaking change for downstream agents).

## Reporting bugs and requesting features

Use the GitHub Issues tab. Include:

- What you tried
- What you expected
- What actually happened
- Screenshots or logs where relevant

## Code of Conduct

Be kind, be specific, and assume good intent. This project follows the spirit of the [Contributor Covenant](https://www.contributor-covenant.org/).