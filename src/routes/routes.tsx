import { Routes, Route, Outlet } from 'react-router-dom';

import Home from '@/presentation/pages/Home';
import Dashboard from '@/presentation/pages/dashboard/Dashboard';
import ProtectedRoute from '@/routes/protectedRoutes';
import Login from '@/presentation/pages/Login';
import SignUp from '@/presentation/pages/Signup';
import NoMatch from '@/presentation/pages/NoMatch';
import LayoutDashboard from '@/presentation/shared/LayoutDashboard';
import Community from '@/presentation/pages/dashboard/Community';
import Folders from '@/presentation/pages/dashboard/Folders';
import Settings from '@/presentation/pages/dashboard/Settings';
import SinglePageFolder from '@/presentation/pages/folders/Single';
import CreateFolder from '@/presentation/pages/folders/CreateFolder';
import FirstTimeFormPage from '@/presentation/pages/dashboard/FirstTimeForm';
import GenerateWithIa from '@/presentation/pages/folders/GenerateWithIa';
import GenerateManual from '@/presentation/pages/folders/GenerateManual';
import LayoutAuth from '@/presentation/shared/LayoutAuth';
import QuizMode from '@/presentation/components/quiz/QuizMode';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <LayoutAuth>
            <Login />
          </LayoutAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <LayoutAuth>
            <SignUp />
          </LayoutAuth>
        }
      />
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
        <Route path="folders/:id/quiz" element={<QuizMode />} />
      </Route>
    </Routes>
  );
};
