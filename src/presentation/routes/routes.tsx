import ErrorBoundary from '@/presentation/components/ErrorBoundary';
import QuizMode from '@/presentation/components/quiz/QuizMode';
import { AuthProvider } from '@/presentation/context/AuthContext';
import Home from '@/presentation/pages/Home';
import Login from '@/presentation/pages/Login';
import NoMatch from '@/presentation/pages/NoMatch';
import ResetPassword from '@/presentation/pages/ResetPassword';
import SignUp from '@/presentation/pages/Signup';
import UpdatePassword from '@/presentation/pages/UpdatePassword';
import Community from '@/presentation/pages/dashboard/Community';
import Dashboard from '@/presentation/pages/dashboard/Dashboard';
import FirstTime from '@/presentation/pages/dashboard/FirstTime';
import Folders from '@/presentation/pages/dashboard/Folders';
import Settings from '@/presentation/pages/dashboard/Settings';
import TopRanked from '@/presentation/pages/dashboard/TopRanked';
import CreateFolder from '@/presentation/pages/folders/CreateFolder';
import GenerateByPdf from '@/presentation/pages/folders/GenerateByPdf';
import GenerateManual from '@/presentation/pages/folders/GenerateManual';
import GenerateWithIa from '@/presentation/pages/folders/GenerateWithIa';
import SinglePageFolder, { folderLoader } from '@/presentation/pages/folders/Single';
import ProtectedRoute from '@/presentation/routes/protectedRoutes';
import LayoutAuth from '@/presentation/shared/LayoutAuth';
import LayoutDashboard from '@/presentation/shared/LayoutDashboard';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PriorityReview } from '../components/flashcards/PriorityReview';

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: '*',
        element: <NoMatch />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/update-password',
        element: (
          <LayoutAuth>
            <UpdatePassword />
          </LayoutAuth>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <LayoutAuth>
            <ResetPassword />
          </LayoutAuth>
        ),
      },
      {
        path: '/login',
        element: (
          <LayoutAuth>
            <Login />
          </LayoutAuth>
        ),
      },
      {
        path: '/signup',
        element: (
          <LayoutAuth>
            <SignUp />
          </LayoutAuth>
        ),
      },
      {
        path: '/first-time',
        element: (
          <ProtectedRoute>
            <FirstTime />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <LayoutDashboard>
              <Outlet />
            </LayoutDashboard>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'community', element: <Community /> },
          { path: 'folders', element: <Folders /> },
          { path: 'settings', element: <Settings /> },
          { path: 'top-ranked', element: <TopRanked /> },
          {
            path: 'folders/:id',
            element: <SinglePageFolder />,
            loader: folderLoader as unknown as undefined,
          },
          {
            path: 'priority-review',
            element: (
              <ErrorBoundary>
                <PriorityReview />
              </ErrorBoundary>
            ),
          },
          { path: 'folders/new', element: <CreateFolder /> },
          { path: 'folders/:id/generate-ai', element: <GenerateWithIa /> },
          { path: 'folders/:id/generate-manual', element: <GenerateManual /> },
          { path: 'folders/:id/upload-document', element: <GenerateByPdf /> },
          { path: 'folders/:id/quiz', element: <QuizMode /> },
          { path: 'profile', element: <Settings /> },
        ],
      },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
