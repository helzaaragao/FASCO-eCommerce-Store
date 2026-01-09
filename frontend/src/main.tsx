import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
      <App />
  </StrictMode>,
)
/* Fluxo Correto das Páginas: 
1. main.tsx renderiza <App />
2. App renderiza <RouterProvider />
3. RouterProvider decide qual página mostrar baseado na URL
4. Se URL = "/" → mostra <Home />
*/