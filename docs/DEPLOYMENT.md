# Deployment Guide

## Overview

Guide for deploying the Multi AI Agent PM Team dashboard.

**Built by Varun Kulkarni**

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+
- Git

## Local Development

```bash
# Clone
git clone https://github.com/varunk130/multi-ai-agent-pm-team.git
cd multi-ai-agent-pm-team

# Install
npm install

# Dev server with HMR
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

## Production Build

```bash
# Build
npm run build

# Preview locally
npm run preview
```

Output goes to `dist/` directory.

## Static Hosting Options

This is a static frontend app — no backend required.

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages
3. Or use a GitHub Action (see `.github/workflows/deploy.yml`)

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

### Azure Static Web Apps

```bash
az staticwebapp create \
  --name multi-ai-agent-pm-team \
  --resource-group your-rg \
  --source https://github.com/varunk130/multi-ai-agent-pm-team \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

## Environment Variables

This project requires **no environment variables**. All data is pre-computed and bundled with the application. No API keys needed.

## Security Notes

- No secrets required for deployment
- All data is synthetic and safe for public hosting
- No backend or API to secure
- Standard HTTPS recommended for any hosting

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm install` fails | Ensure Node.js 18+ is installed |
| Fonts not loading | Check network access to fonts.googleapis.com |
| Build warnings | Run `npm run lint` to check for issues |
| Port 5173 in use | Vite will auto-increment to 5174 |
