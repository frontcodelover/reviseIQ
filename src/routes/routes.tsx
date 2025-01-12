import { Routes, Route, Outlet } from 'react-router-dom';

import Home from '@/pages/Home';
import Dashboard from '@/pages/dashboard/Dashboard';
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
import GenerateWithIa from '@/pages/folders/GenerateWithIa';
import GenerateManual from '@/pages/folders/GenerateManual';

export const AppRoutes = () => {
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
        <Route path="folders/:id/generate-ai" element={<GenerateWithIa />} />
        <Route path="folders/:id/generate-manual" element={<GenerateManual />} />
      </Route>
    </Routes>
  );
};
