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
