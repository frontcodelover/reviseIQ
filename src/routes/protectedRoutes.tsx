import { Navigate } from 'react-router-dom';
import { useAuth } from '@/presentation/context/AuthContext';

import LoadingScreen from '@/presentation/pages/LoadingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, hasProfile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasProfile && window.location.pathname !== '/first-time') {
    return <Navigate to="/first-time" replace />;
  }

  if (hasProfile && window.location.pathname === '/first-time') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
