import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home.tsx';
import './i18n';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from '@/components/protectedRoutes.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import NoMatch from './pages/NoMatch.tsx';
import LayoutDashboard from './components/layoutDashboard.tsx';
import Community from './pages/dashboard/Community.tsx';
import Folders from './pages/dashboard/Folders.tsx';
import Settings from './pages/dashboard/Settings.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LayoutDashboard>
                <Outlet />
              </LayoutDashboard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="folders" element={<Folders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
