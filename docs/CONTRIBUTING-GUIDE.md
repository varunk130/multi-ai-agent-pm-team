# Contributing Guide — Detailed

## Overview

Detailed contribution guide for the Multi AI Agent PM Team project.

**Built by Varun Kulkarni**

## Development Workflow

### 1. Fork and Clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR-USERNAME/multi-ai-agent-pm-team.git
cd multi-ai-agent-pm-team
git remote add upstream https://github.com/varunk130/multi-ai-agent-pm-team.git
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `style/` — UI/CSS changes
- `refactor/` — Code refactoring
- `ci/` — CI/CD changes

### 3. Make Changes

Follow the code style guide:

#### JavaScript
```javascript
// ✅ Good: Named exports, functional components
export function AgentNode({ agent, state, onSelect }) {
  // ...
}

// ❌ Bad: Default exports, class components
export default class AgentNode extends Component {
  // ...
}
```

#### CSS
```css
/* ✅ Good: Use CSS variables for theme values */
.card { background: var(--color-bg-card); }

/* ❌ Bad: Hardcoded colors */
.card { background: #111827; }
```

### 4. Test Your Changes

```bash
npm run dev     # Visual testing
npm run build   # Build verification
npm run lint    # Code quality
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: add new agent visualization component"
git push origin feature/your-feature-name
```

### 6. Submit Pull Request

- Use the PR template
- Reference related issues
- Include screenshots for UI changes
- Confirm security checklist

## Adding a New Agent

To add a 7th agent to the pipeline:

1. Create `agents/07-your-agent/README.md`
2. Create `agents/07-your-agent/config.js`
3. Add agent to `AGENTS` array in `src/data/agentConfig.js`
4. Create `src/data/agent7Output.js` with pre-computed output
5. Add import to `src/hooks/usePipelineRunner.js`
6. Choose a theme color not yet used
7. Update documentation

## Code Review Checklist

- [ ] No secrets or real customer data
- [ ] Follows existing code patterns
- [ ] Components are functional with hooks
- [ ] CSS uses design system tokens
- [ ] New features have documentation
- [ ] Commit messages follow conventional format
