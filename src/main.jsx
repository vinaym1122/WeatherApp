import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authentication from './component/authentication.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
       <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authentication" element={<Authentication />} />
       </Routes>
  </BrowserRouter>

)
