import { useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

const navigation = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact']]

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

  const isDark = theme === 'dark'
  const switchTheme = (nextTheme: 'light' | 'dark') => {
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    try { localStorage.setItem('portfolio-theme', nextTheme) } catch { /* Storage can be unavailable in private contexts. */ }
    setTheme(nextTheme)
  }

  return <header className="site-header"><div className="header-actions"><nav aria-label="Primary navigation"><ul className="nav-list">{navigation.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></nav><button className="theme-toggle" type="button" onClick={() => switchTheme(isDark ? 'light' : 'dark')} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} aria-pressed={isDark}>{isDark ? <HiOutlineSun aria-hidden="true" /> : <HiOutlineMoon aria-hidden="true" />}</button></div></header>
}
