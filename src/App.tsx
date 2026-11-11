import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Interview } from './components/Interview/Interview'
import { Projects } from './components/Projects/Projects'
import { Skills } from './components/Skills/Skills'
import { ArticlePage } from './components/Writing/ArticlePage'
import { Writing } from './components/Writing/Writing'
import { findArticle } from './data/articles'
import './App.css'

/** Articles live at /writing/<slug>; nginx serves index.html for every path, so no router is needed. */
const currentArticle = () => {
  const slug = window.location.pathname.match(/^\/writing\/([\w-]+)\/?$/)?.[1]
  return slug ? findArticle(slug) : undefined
}

function App() {
  const article = currentArticle()
  return <div className="site-shell"><Header /><main>{article ? <ArticlePage article={article} /> : <><Hero /><About /><Skills /><Projects /><Writing /><Interview /><Contact /></>}</main><Footer /></div>
}

export default App
