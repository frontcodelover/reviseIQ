import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { useAuth } from '@/presentation/context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, hasProfile, loading, isPasswordRecovery } = useAuth();

  if (loading) return <Spinner />;

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
