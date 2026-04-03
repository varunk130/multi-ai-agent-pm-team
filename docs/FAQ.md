# Multi AI Agent PM Team — Technical FAQ

## Frequently Asked Questions

### General

**Q: Does this project make real API calls to Claude?**
A: No. All agent outputs are pre-computed and stored as JavaScript modules. This is a design and architecture demo focused on orchestration patterns, not a live LLM wrapper.

**Q: Is any real customer data used?**
A: Absolutely not. All 50 customer tickets, company names, ARR figures, product metrics, and agent outputs are 100% synthetic and fictional.

**Q: What AI models would be used in a production version?**
A: Agents 1, 2, 3, and 6 would use Claude Sonnet 4.5 for speed, while Agents 4 and 5 (strategic reasoning and PRD generation) would use Claude Opus 4.6 for maximum reasoning depth.

### Technical

**Q: Why React 19 + Vite 7?**
A: React 19 for the latest concurrent features and Vite 7 for fast HMR during development and optimized production builds. Both are mature and well-supported.

**Q: Why Tailwind CSS v4?**
A: Tailwind v4's new engine with CSS custom properties integrates cleanly with our theme system while keeping styles co-located with components.

**Q: Why no UI component library (shadcn, Radix, MUI)?**
A: Precise control over the dark theme aesthetic was a priority. Every card, connector, animation, and interaction is purpose-built for this specific design.

**Q: Why a custom markdown renderer?**
A: Standard libraries (react-markdown, marked) couldn't perfectly match the dark theme table rendering and code block styling without significant overrides. A custom renderer gives complete control.

**Q: How does the typewriter effect work?**
A: Uses `requestAnimationFrame` for 60fps character-by-character reveal. It's markdown-aware, meaning it won't break mid-formatting-tag (e.g., won't show half of a `**bold**` token).

### Architecture

**Q: Why sequential execution instead of parallel?**
A: Sequential execution enables cumulative context — each agent sees the full output of all previous agents. Agent 4 (Chief of Staff) makes strategic decisions informed by pattern recognition (Agent 1), statistical validation (Agent 2), and narrative synthesis (Agent 3) simultaneously.

**Q: How are outputs passed between agents?**
A: Via typed structured payloads (JavaScript objects), not raw text. Each agent has a defined input/output contract documented in `docs/DATA-CONTRACTS.md`.

**Q: Can I add more agents?**
A: Yes. Add a new agent folder in `agents/`, define its config in `agentConfig.js`, create its pre-computed output, and register it in the pipeline runner. See `docs/CONTRIBUTING-GUIDE.md`.

### Development

**Q: How do I run this locally?**
```bash
git clone https://github.com/varunk130/multi-ai-agent-pm-team.git
cd multi-ai-agent-pm-team
npm install
npm run dev
```

**Q: What tools does this work with?**
A: Designed for both **Claude Code** (see `CLAUDE.md`) and **GitHub Copilot** (see `.github/copilot-instructions.md`).

---

**Built by [Varun Kulkarni](https://github.com/varunk130)**
