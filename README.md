# Shreyas Profile Web

A responsive personal portfolio for **Shreyas Vikrant Dewangswami**, built with React 19 and TypeScript. It showcases skills, projects, and professional journey, and features a live **Quote of the Day** served by a companion ASP.NET Core API. The site is containerized with Docker, served by Nginx, and deployed through a Jenkins CI/CD pipeline.

**Live site:** [shreyasportfolio.hopto.org](https://shreyasportfolio.hopto.org/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Backend Integration](#backend-integration)
- [Testing and Linting](#testing-and-linting)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Analytics and Privacy](#analytics-and-privacy)

---

## Features

- **Responsive layout** for desktop, tablet, and mobile screens
- **Portfolio sections:** Hero, About, Journey, Skills, Projects, and Contact
- **Light and dark themes** with the selected theme saved in `localStorage` and applied before first paint to avoid a flash of the wrong theme
- **Scroll reveal animations** built on `IntersectionObserver`, automatically disabled for users who prefer reduced motion
- **Quote of the Day** fetched from a companion ASP.NET Core API through a typed client with request cancellation via `AbortSignal`
- **Privacy-focused analytics** through an optional, self-hosted Umami instance
- **Automated CI/CD** with Jenkins, Docker, and post-deployment health checks

## Tech Stack

### Frontend

| Technology  | Version | Purpose                                                       |
| ----------- | ------- | ------------------------------------------------------------- |
| React       | 19      | Component-based UI                                            |
| TypeScript  | 6       | Static typing across components, services, and API contracts  |
| Vite        | 8       | Development server, `/api` proxy, and production bundling     |
| React Icons | 5       | Technology, social, and UI icons                              |
| CSS         | —       | Global styles, theming, and responsive layout                 |
| Fetch API   | —       | Typed HTTP client for the backend                             |

### Testing and Code Quality

| Technology                  | Version | Purpose                                  |
| --------------------------- | ------- | ---------------------------------------- |
| Vitest                      | 4       | Test runner                              |
| React Testing Library       | 16      | Component testing                        |
| jest-dom                    | 6       | Custom DOM matchers                      |
| jsdom                       | 27      | Browser environment for tests            |
| Oxlint                      | 1       | Fast linting with React and TypeScript rules |

### DevOps and Deployment

| Technology | Purpose                                                      |
| ---------- | ------------------------------------------------------------ |
| Docker     | Multi-stage build that compiles the app and packages it for serving |
| Nginx      | Serves the static production build with SPA route fallback   |
| Jenkins    | CI/CD pipeline for build verification, deployment, and health checks |
| Linux      | Server environment hosting the Docker container              |

### Backend and Analytics

| Technology         | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| ASP.NET Core (C#)  | Companion REST API serving the Quote of the Day |
| Umami              | Optional, self-hosted, privacy-friendly analytics |

## Prerequisites

- [Node.js](https://nodejs.org/) 24 or later
- npm
- The companion backend API running locally (required only for the live Quote of the Day)
- Docker (optional, for running the production container locally)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/dewangshree/shreyas-portfolio-web.git
cd shreyas-portfolio-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

Start the backend API first if you want the Quote of the Day to load live data.

## Available Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server                   |
| `npm run build`   | Type-checks with `tsc` and creates a production build |
| `npm run preview` | Serves the production build locally for review      |
| `npm test`        | Runs the test suite once with Vitest                 |
| `npm run lint`    | Lints the codebase with Oxlint                       |

## Configuration

All configuration is supplied through environment variables.

| Variable                | Required | Default                 | Description                                        |
| ----------------------- | -------- | ----------------------- | -------------------------------------------------- |
| `VITE_API_PROXY_TARGET` | No       | `http://localhost:5213` | Backend address the development proxy forwards to  |
| `VITE_API_BASE_URL`     | No       | Same origin             | Base URL prefixed to API requests                  |
| `VITE_UMAMI_WEBSITE_ID` | No       | None                    | Umami website ID; enables analytics when set       |
| `VITE_UMAMI_SCRIPT_URL` | No       | None                    | URL of the Umami tracking script                   |

## Backend Integration

The Quote of the Day component calls a single endpoint:

```
GET /api/quotes/today
```

The response follows this contract:

```ts
interface Quote {
  text: string
  author: string
  date: string
  source: string
}
```

During development, Vite proxies every `/api` request to `http://localhost:5213`, which matches the backend's Development HTTP profile. To use a different local backend, create a `.env.local` file:

```bash
VITE_API_PROXY_TARGET=http://localhost:5000
```

## Testing and Linting

Tests run in a jsdom environment with React Testing Library and jest-dom matchers, configured in `vite.config.ts` and `src/test/setup.ts`.

```bash
npm test        # Run the test suite
npm run lint    # Run Oxlint
```

## Deployment

### Docker

The `Dockerfile` uses a multi-stage build:

1. **Build stage:** a Node Alpine image installs dependencies with `npm ci` and runs `npm run build`.
2. **Serve stage:** an Nginx Alpine image serves the compiled `dist` output on port 80, with `try_files` falling back to `index.html` for client-side routes.

To build and run the container locally:

```bash
docker build -t shreyas-portfolio-frontend .
docker run -d -p 8080:80 shreyas-portfolio-frontend
```

The site is then available at `http://localhost:8080`.

### Jenkins CI/CD

The `Jenkinsfile` defines a pipeline that runs on every build, with concurrent builds disabled and timestamped logs:

| Stage            | What it does                                                                 |
| ---------------- | ---------------------------------------------------------------------------- |
| **Checkout**     | Pulls the latest source from the repository                                  |
| **Verify**       | Installs dependencies with `npm ci` and runs a production build              |
| **Deploy**       | Syncs the source to the server, builds a versioned Docker image tagged with the build number, and replaces the running container |
| **Health Check** | Confirms both the container and the public website respond successfully      |

The container runs with `--restart unless-stopped` and is bound to localhost on the server, so all public traffic goes through the server's reverse proxy.

## Project Structure

```text
.
├── public/
│   └── images/              # Profile photo and section backgrounds
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Header/          # Navigation and theme toggle
│   │   ├── Hero/
│   │   ├── Journey/
│   │   ├── Projects/
│   │   ├── QuoteOfTheDay/
│   │   └── Skills/
│   ├── hooks/               # useScrollReveal
│   ├── services/            # Quote API client and analytics helper
│   ├── styles/              # Global styles
│   ├── test/                # Vitest setup
│   ├── types/               # API contracts
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point and Umami loader
├── Dockerfile               # Multi-stage build and Nginx image
├── Jenkinsfile              # CI/CD pipeline
├── nginx.conf               # Nginx SPA configuration
└── vite.config.ts           # Vite, proxy, and Vitest configuration
```

## Analytics and Privacy

Analytics are **disabled by default**. The Umami script is loaded only when both of the following variables are set at build time:

```bash
VITE_UMAMI_WEBSITE_ID=your-umami-website-id
VITE_UMAMI_SCRIPT_URL=https://your-umami-host/script.js
```

When enabled, data collection is limited to:

- **Page views:** Umami's standard total and unique visitor counts
- **`project-click` events:** the project name and the link destination (`card`, `github`, or `live`)

No personal visitor data or interview interactions are tracked.
