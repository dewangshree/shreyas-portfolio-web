# Shreyas Profile Web

A responsive React and TypeScript portfolio for Shreyas Vikrant Dewangswami. It presents skills and projects, and displays a Quote of the Day from the companion ASP.NET Core API.

## Prerequisites

- Node.js 24 or later
- npm
- The backend API running locally for live quote integration

## Commands

```bash
npm install
npm run dev
npm test
npm run build
```

## Backend dependency and proxy

The Quote of the Day component requests only `/api/quotes/today`. Vite forwards `/api` requests to `http://localhost:5213` by default, matching the backend's Development HTTP profile. Set `VITE_API_PROXY_TARGET` when a different local backend address is required.

## Folder structure

```text
src/
├── components/       # Page sections and Quote of the Day UI
├── services/         # Typed fetch client
├── styles/           # Global styles
├── test/             # Vitest setup
├── types/            # API contracts
├── App.tsx
└── main.tsx
```

The portfolio is intentionally frontend-only: authentication, databases, deployment, Docker, and CI/CD are outside this phase.

## Private analytics (optional)

The site is ready for a private Umami instance but sends no analytics until it is configured. Set these deployment environment variables:

```bash
VITE_UMAMI_WEBSITE_ID=your-umami-website-id
VITE_UMAMI_SCRIPT_URL=https://your-umami-host/script.js
```

Umami then records its standard page views (total and unique visitors) and the portfolio sends only `project-click` events with the project name and destination (`card`, `github`, or `live`). No personal visitor data or interview interactions are tracked.
