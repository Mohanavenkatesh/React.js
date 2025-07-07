import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Rich } from './App.jsx'
import { Mohan } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rich />
    <Mohan />
  </StrictMode>,
)
