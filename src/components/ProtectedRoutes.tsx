import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';
import LoadingScreen from '@/pages/LoadingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [lastCheck, setLastCheck] = useState(Date.now());

  useEffect(() => {
    const checkUserProfile = async () => {
      if (user) {
        const backend = getBackend();
        const hasUserProfile = await backend.hasUserProfile(user.id);
        console.log('Profile check result:', hasUserProfile);
        setHasProfile(hasUserProfile);
        setCheckingProfile(false);
      }
    };

    checkUserProfile();
  }, [user, lastCheck, location.pathname]);

  // Vérification périodique sur /first-time
  useEffect(() => {
    if (location.pathname === '/first-time') {
      const interval = setInterval(() => {
        setLastCheck(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  if (loading || checkingProfile) {
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