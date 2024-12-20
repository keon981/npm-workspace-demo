import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

//  style
import '@npm-workspace-demo/components/style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
