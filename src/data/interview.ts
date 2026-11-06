/*
 * ✏️ MONTHLY UPDATE FILE: Interview me chatbot
 *
 * 1. Change any `answer` text below (plain English).
 * 2. Update `updatedOn` to today's date.
 * 3. Push to GitHub → Jenkins deploys it.
 *
 * To add a question, copy one block and give it a new unique `id`.
 */

export type InterviewLink = { label: string; href: string }

export type InterviewQA = {
  id: string
  question: string
  answer: string
  link?: InterviewLink
}

export const updatedOn = '2026-11-06'

export const interviewQuestions: InterviewQA[] = [
  {
    id: 'about',
    question: 'Tell me about yourself.',
    answer: "I'm a full-stack software engineer, currently a Software Engineer Intern at B2A Technologies. I build React + TypeScript frontends and ASP.NET Core backends, and lately a lot of AI agent systems. I also like owning the delivery side: Docker, Nginx and Jenkins pipelines.",
  },
  {
    id: 'hire',
    question: 'Why should we hire you?',
    answer: "Because I ship things end to end. I don't stop at a demo: my projects have live deployments, tests and CI/CD. This portfolio itself is built by Jenkins, packaged in Docker and served with Nginx. You get someone who can design it, build it, test it and put it in production.",
    link: { label: 'See my projects', href: '#projects' },
  },
  {
    id: 'challenge',
    question: 'What was your biggest technical challenge?',
    answer: 'Making an AI investigation tool trustworthy. In my Quick-Commerce AI Ops platform, an LLM could easily invent numbers. So I kept every metric in SQL and deterministic Python, made contributing factors rule-based with evidence IDs, and only let the model help with the conversation. Then I verified the results line by line against the original system.',
    link: { label: 'Quick-Commerce AI Ops on GitHub', href: 'https://github.com/dewangshree/quick-commerce-rca-agent' },
  },
  {
    id: 'proud',
    question: 'Which project are you most proud of?',
    answer: "Wind Forecast Analytics. The interesting part wasn't the charts, it was the logic: for every delivery hour, the app picks only the forecast a buyer could actually see before the 09:50 day-ahead cutoff, so the accuracy scores aren't polluted by hindsight. It runs on real UK grid data from Elexon.",
    link: { label: 'Open the live app', href: 'https://wind-forecast-analytics-psi.vercel.app' },
  },
  {
    id: 'stack',
    question: 'What is your tech stack?',
    answer: 'Frontend: React, TypeScript, HTML and CSS. Backend: ASP.NET Core with C#, plus Python and PostgreSQL. DevOps: Docker, Jenkins, Nginx, Linux, Git and SonarQube. AI: multi-agent systems with CrewAI and LangGraph.',
    link: { label: 'See all my skills', href: '#skills' },
  },
  {
    id: 'role',
    question: 'What kind of role are you looking for?',
    answer: 'A software engineering role where I can work across the stack: product-facing features, solid APIs, and AI where it genuinely helps. Teams that care about code quality, testing and shipping reliably are where I do my best work.',
  },
  {
    id: 'relocate',
    question: 'Are you open to relocation?',
    answer: "Yes. I'm open to relocation, and also to remote or hybrid roles.",
  },
  {
    id: 'contact',
    question: 'How can I contact you?',
    answer: "Easiest is email: shreyasdewangswami17@gmail.com. You can also find me on LinkedIn, or use the Contact section to schedule a call.",
    link: { label: 'Go to Contact', href: '#contact' },
  },
]
