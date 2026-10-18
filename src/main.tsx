import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL
if (umamiWebsiteId && umamiScriptUrl) {
  const script = document.createElement('script')
  script.defer = true
  script.src = umamiScriptUrl
  script.dataset.websiteId = umamiWebsiteId
  document.head.append(script)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
