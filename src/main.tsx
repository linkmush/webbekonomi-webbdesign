import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/i18n'
import './index.css'
import App from './App.tsx'

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()

  const reloadKey = 'vite:preloadError:reloaded'

  if (window.sessionStorage.getItem(reloadKey) === 'true') {
    window.sessionStorage.removeItem(reloadKey)
    return
  }

  window.sessionStorage.setItem(reloadKey, 'true')
  window.location.reload()
})

window.sessionStorage.removeItem('vite:preloadError:reloaded')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
