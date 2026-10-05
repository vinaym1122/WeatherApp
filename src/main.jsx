import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authentication from './component/authentication.jsx'
import Homepage from './component/Homepage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
)
