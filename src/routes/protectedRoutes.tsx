import { Navigate } from 'react-router-dom';
import { useAuth } from '@/presentation/context/AuthContext';

import LoadingScreen from '@/presentation/pages/LoadingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, hasProfile, loading, isPasswordRecovery } = useAuth();

  if (loading) return <LoadingScreen />;

  if (isPasswordRecovery && window.location.pathname === '/update-password') {
    return children;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (!hasProfile && window.location.pathname !== '/first-time') {
    return <Navigate to="/first-time" replace />;
  }

  return children;
}

export default ProtectedRoute;
