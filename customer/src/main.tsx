import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>
  
)
