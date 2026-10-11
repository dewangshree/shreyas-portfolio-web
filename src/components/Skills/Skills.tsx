import type { IconType } from 'react-icons'
import { SiCrewai, SiCss, SiDocker, SiDotnet, SiFastapi, SiGit, SiGithub, SiGithubactions, SiHtml5, SiJenkins, SiLinux, SiNginx, SiPostgresql, SiPython, SiReact, SiSonar, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'
import { useScrollReveal } from '../../hooks/useScrollReveal'

type Skill = { name: string; icon: IconType; color?: string }

const skillGroups: { title: string; skills: Skill[] }[] = [
  { title: 'Frontend', skills: [{ name: 'React', icon: SiReact, color: '#61DAFB' }, { name: 'HTML5', icon: SiHtml5, color: '#E34F26' }, { name: 'CSS3', icon: SiCss, color: '#1572B6' }] },
  { title: 'Backend', skills: [{ name: 'ASP.NET Core', icon: SiDotnet, color: '#512BD4' }, { name: 'FastAPI / REST APIs', icon: SiFastapi, color: '#009688' }] },
  { title: 'Languages', skills: [{ name: 'TypeScript', icon: SiTypescript, color: '#3178C6' }, { name: 'C#', icon: TbBrandCSharp, color: '#512BD4' }, { name: 'Python', icon: SiPython, color: '#3776AB' }] },
  { title: 'Databases', skills: [{ name: 'PostgreSQL / SQL', icon: SiPostgresql, color: '#4169E1' }] },
  { title: 'DevOps / Tools', skills: [{ name: 'Git', icon: SiGit, color: '#F05032' }, { name: 'GitHub', icon: SiGithub }, { name: 'Jenkins', icon: SiJenkins, color: '#D24939' }, { name: 'Linux', icon: SiLinux, color: '#FCC624' }, { name: 'Nginx', icon: SiNginx, color: '#009639' }, { name: 'Docker', icon: SiDocker, color: '#2496ED' }, { name: 'SonarQube', icon: SiSonar, color: '#4E9BCD' }, { name: 'CI/CD', icon: SiGithubactions, color: '#2088FF' }] },
  { title: 'AI & LLM', skills: [{ name: 'CrewAI', icon: SiCrewai, color: '#6C47FF' }] },
]

export function Skills() { const { isVisible, revealRef } = useScrollReveal(); return <section className={`section reveal ${isVisible ? 'is-visible' : ''}`} id="skills" aria-labelledby="skills-title" ref={revealRef}><div className="section-heading"><p className="eyebrow">Skills</p><h2 id="skills-title">Tools I work with.</h2></div><div className="skills-grid">{skillGroups.map((group) => <div className={`card skill-category skill-category--${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}`} key={group.title}><h3>{group.title}</h3><ul className="skill-icon-grid">{group.skills.map(({ name, icon: Icon, color }) => <li className="skill-tile" key={name}><Icon className="skill-logo" color={color} aria-hidden="true" /><span className="skill-label">{name}</span></li>)}</ul></div>)}</div></section> }
