<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Shreyas%20Portfolio%20Web%20🚀&fontSize=48&fontColor=fff&fontAlignY=38&desc=React%2019%20·%20TypeScript%20·%20Docker%20·%20Jenkins%20CI%2FCD&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=00D9FF&center=true&vCenter=true&random=false&width=700&lines=Responsive+developer+portfolio+%F0%9F%92%BB;Live+Quote+of+the+Day+from+ASP.NET+Core+%E2%9A%A1;Dockerized+%2B+served+with+Nginx+%F0%9F%90%B3;Auto-deployed+with+Jenkins+CI%2FCD+%F0%9F%94%81)](https://git.io/typing-svg)

<br/>

[![Live Site](https://img.shields.io/badge/🌐%20LIVE%20SITE-shreyasportfolio.hopto.org-00D9FF?style=for-the-badge&labelColor=1a1a2e)](https://shreyasportfolio.hopto.org/)

![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%206-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

</div>

---

## 💫 About the Project

```ts
const portfolio = {
  owner:     "Shreyas Vikrant Dewangswami",
  type:      "Personal Developer Portfolio",
  frontend:  ["React 19", "TypeScript", "Vite"],
  backend:   "ASP.NET Core API (Quote of the Day)",
  devops:    ["Docker", "Nginx", "Jenkins CI/CD"],
  testing:   ["Vitest", "React Testing Library"],
  analytics: "Umami (optional, privacy-first)",
  live:      "https://shreyasportfolio.hopto.org",
}
```

---

## ✨ Features

<div align="center">

| 🎨 Design | ⚡ Functionality | 🔁 DevOps |
|:---:|:---:|:---:|
| Fully responsive layout | Live Quote of the Day API | Multi-stage Docker build |
| Light & dark themes | Typed fetch client with `AbortSignal` | Nginx static hosting |
| No theme flash on load | Hero, About, Journey, Skills, Projects, Contact | Jenkins CI/CD pipeline |
| Scroll-reveal animations | Privacy-first Umami analytics | Automated health checks |
| Respects reduced motion | Vitest + Testing Library tests | Versioned Docker images |

</div>

---

## 💻 Tech Stack

### 🖥️ Frontend

<div align="center">

[![Frontend](https://skillicons.dev/icons?i=react,ts,vite,html,css&theme=dark)](https://skillicons.dev)

</div>

![React Icons](https://img.shields.io/badge/React%20Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)
![Fetch API](https://img.shields.io/badge/Fetch%20API-1a1a2e?style=for-the-badge)

### 🧪 Testing & Code Quality

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)
![jest-dom](https://img.shields.io/badge/jest--dom-C21325?style=for-the-badge&logo=jest&logoColor=white)
![jsdom](https://img.shields.io/badge/jsdom-F7DF1E?style=for-the-badge&logoColor=black)
![Oxlint](https://img.shields.io/badge/Oxlint-00D9FF?style=for-the-badge&labelColor=1a1a2e)

### 🐳 DevOps & Deployment

<div align="center">

[![DevOps](https://skillicons.dev/icons?i=docker,nginx,jenkins,linux,git,github&theme=dark)](https://skillicons.dev)

</div>

### ⚙️ Backend & Analytics

<div align="center">

[![Backend](https://skillicons.dev/icons?i=dotnet,cs&theme=dark)](https://skillicons.dev)

</div>

![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Umami](https://img.shields.io/badge/Umami%20Analytics-000000?style=for-the-badge)

---

## 🚀 Getting Started

> **Prerequisites:** Node.js 24+, npm, and the backend API running locally for live quotes. Docker is optional.

```bash
# 1. Clone the repo
git clone https://github.com/dewangshree/shreyas-portfolio-web.git
cd shreyas-portfolio-web

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

### 📜 Scripts

| Command | What it does |
|:---|:---|
| `npm run dev` | ⚡ Start the Vite dev server |
| `npm run build` | 🏗️ Type-check with `tsc` and build for production |
| `npm run preview` | 👀 Preview the production build |
| `npm test` | 🧪 Run tests with Vitest |
| `npm run lint` | 🧹 Lint with Oxlint |

---

## 🔧 Configuration

| Variable | Default | Purpose |
|:---|:---|:---|
| `VITE_API_PROXY_TARGET` | `http://localhost:5213` | Backend address for the dev proxy |
| `VITE_API_BASE_URL` | Same origin | Base URL for API requests |
| `VITE_UMAMI_WEBSITE_ID` | — | Umami website ID (enables analytics) |
| `VITE_UMAMI_SCRIPT_URL` | — | Umami tracking script URL |

---

## 🔗 Backend Integration

The Quote of the Day calls one endpoint on the companion ASP.NET Core API:

```http
GET /api/quotes/today
```

```ts
interface Quote {
  text: string
  author: string
  date: string
  source: string
}
```

In development, Vite proxies `/api` to `http://localhost:5213`. To use another address, add it to `.env.local`:

```bash
VITE_API_PROXY_TARGET=http://localhost:5000
```

---

## 🔁 CI/CD Pipeline

```mermaid
flowchart LR
    A[📥 Checkout] --> B[✅ Verify<br/>npm ci + build]
    B --> C[🐳 Deploy<br/>Docker build + run]
    C --> D[🩺 Health Check<br/>container + live site]
```

| Stage | What happens |
|:---|:---|
| 📥 **Checkout** | Pulls the latest source code |
| ✅ **Verify** | Installs dependencies and runs a production build |
| 🐳 **Deploy** | Syncs code to the server, builds a Docker image tagged with the build number, and swaps the running container |
| 🩺 **Health Check** | Confirms the container and the public site both respond |

### 🐳 Run with Docker

```bash
docker build -t shreyas-portfolio-frontend .
docker run -d -p 8080:80 shreyas-portfolio-frontend
```

Open **http://localhost:8080** 🎉

---

## 🗂️ Project Structure

```text
.
├── public/images/           # 🖼️ Profile photo & section backgrounds
├── src/
│   ├── components/          # 🧩 Hero, About, Journey, Skills, Projects,
│   │                        #    Contact, Header, Footer, QuoteOfTheDay
│   ├── hooks/               # 🪝 useScrollReveal
│   ├── services/            # 🌐 Quote API client & analytics
│   ├── styles/              # 🎨 Global styles
│   ├── test/                # 🧪 Vitest setup
│   ├── types/               # 📐 API contracts
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile               # 🐳 Multi-stage build
├── Jenkinsfile              # 🔁 CI/CD pipeline
├── nginx.conf               # 🌐 SPA routing
└── vite.config.ts           # ⚡ Vite, proxy & test config
```

---

## 🔒 Analytics & Privacy

Analytics are **off by default** and turn on only when both Umami variables are set.

| ✅ Tracked | ❌ Not tracked |
|:---|:---|
| Page views (total & unique) | Personal visitor data |
| `project-click` events (project name + `card` / `github` / `live`) | Interview interactions |

---

<div align="center">

### 🌐 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/Shreyas-Dewangswami)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dewangshree)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shreyasdewangswami17@gmail.com)

**Building systems that actually ship** 🚀

⭐ Star this repo if you like it!

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
