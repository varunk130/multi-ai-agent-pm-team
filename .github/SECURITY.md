# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do NOT open a public issue for security vulnerabilities.**

Instead, please email: **varunk130@users.noreply.github.com**

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 5 business days
- **Fix**: Depending on severity, within 7-30 days

## Security Principles

This project follows these security principles:

1. **No secrets in code**: No API keys, tokens, or credentials are stored in the repository
2. **Synthetic data only**: All customer data, feedback tickets, and metrics are entirely synthetic and fictional
3. **No external API calls**: The demo pipeline uses pre-computed outputs — no live API calls that could leak data
4. **Dependency management**: Dependabot is enabled to monitor and update vulnerable dependencies
5. **Input validation**: All user inputs are sanitized before rendering
6. **Content Security Policy**: No inline scripts or unsafe-eval in production builds

## Data Privacy

All data in this project is **100% synthetic**. No real customer data, proprietary information, company names, or actual business metrics are used anywhere in this repository. Any resemblance to real entities is purely coincidental.

## Dependency Security

We use GitHub Dependabot to automatically:
- Monitor dependencies for known vulnerabilities
- Create pull requests for security updates
- Alert maintainers of critical issues

## Governance

See [GOVERNANCE.md](./GOVERNANCE.md) for project governance policies.
