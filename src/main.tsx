import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from '@/pages/Home';
import './i18n';
import Dashboard from '@/pages/dashboard/Dashboard';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/protectedRoutes';
import Login from '@/pages/Login';
import SignUp from '@/pages/Signup';
import NoMatch from '@/pages/NoMatch';
import LayoutDashboard from '@/components/layoutDashboard';
import Community from '@/pages/dashboard/Community';
import Folders from '@/pages/dashboard/Folders';
import Settings from '@/pages/dashboard/Settings';
import SinglePageFolder from '@/pages/folders/Single';
import CreateFolder from '@/pages/folders/CreateFolder';
import FirstTimeFormPage from '@/pages/dashboard/FirstTimeForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/first-time"
        element={
          <ProtectedRoute>
            <FirstTimeFormPage />
          </ProtectedRoute>
        }
      />
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
        <Route path="folders/:id" element={<SinglePageFolder />} />
        <Route path="folders/new" element={<CreateFolder />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
