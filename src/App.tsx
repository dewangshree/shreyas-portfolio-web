import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Projects } from './components/Projects/Projects'
import { QuoteOfTheDay } from './components/QuoteOfTheDay/QuoteOfTheDay'
import { Skills } from './components/Skills/Skills'
import './App.css'

function App() {
  return <div className="site-shell"><Header /><main><Hero /><About /><Skills /><Projects /><QuoteOfTheDay /><Contact /></main><Footer /></div>
}

export default App
