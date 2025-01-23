import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/presentation/context/AuthContext';

import LoadingScreen from '@/presentation/pages/LoadingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, hasProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasProfile && location.pathname !== '/first-time') {
    return <Navigate to="/first-time" replace />;
  }

  if (hasProfile && location.pathname === '/first-time') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
