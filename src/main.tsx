import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import './i18n';
import Dashboard from './pages/Dashboard.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
    <BrowserRouter>
      <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
