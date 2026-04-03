# Contributing to Multi AI Agent PM Team

Thank you for your interest in contributing! This guide will help you get started.

## Built By

**Varun Kulkarni** — Built with Claude Code and GitHub Copilot.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended with GitHub Copilot, or Claude Code)

### Setup

```bash
# Clone the repository
git clone https://github.com/varunk130/multi-ai-agent-pm-team.git
cd multi-ai-agent-pm-team

# Install dependencies
npm install

# Start development server
npm run dev
```

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use the appropriate issue template (Bug Report or Feature Request)
3. Include clear reproduction steps for bugs
4. Include screenshots where helpful

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the code style guidelines below
4. Commit with clear, descriptive messages
5. Push to your fork and submit a Pull Request

### Code Style

- **JavaScript**: ES modules, functional components, hooks-based state management
- **CSS**: Tailwind utility classes + CSS custom properties for theming
- **Components**: One component per file, named exports
- **Files**: kebab-case for files, PascalCase for components

### Commit Messages

Follow conventional commits:

```
feat: add new agent visualization component
fix: resolve markdown rendering issue with tables
docs: update pipeline architecture documentation
style: adjust agent card border colors
refactor: extract timer logic into custom hook
```

## Security

- **Never commit secrets** (API keys, tokens, credentials)
- **All data must be synthetic** — no real customer data
- See [SECURITY.md](./SECURITY.md) for the full security policy

## Development Tools

This project is designed to work seamlessly with:

- **Claude Code** — AI-powered development with Claude
- **GitHub Copilot** — AI pair programming in your editor

## Questions?

Open a Discussion or Issue on GitHub.
