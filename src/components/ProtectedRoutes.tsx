import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { getBackend } from '@/services/backend';
import LoadingScreen from '@/pages/LoadingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Fonction pour vérifier le profil
  const checkUserProfile = useCallback(async () => {
    if (user) {
      const backend = getBackend();
      const hasUserProfile = await backend.hasUserProfile(user.id);
      console.log('Profile check result:', hasUserProfile);
      setHasProfile(hasUserProfile);
      setCheckingProfile(false);
    }
  }, [user]);

  // Effet pour la vérification initiale
  useEffect(() => {
	  checkUserProfile();
	  console.log("checkUserProfile");
  }, [user, checkUserProfile]);

  // Écouteur d'événement pour la mise à jour du profil
  useEffect(() => {
    const handleProfileUpdate = async (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Profile update event received:', customEvent.detail);
      await checkUserProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () =>
      window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, [checkUserProfile]);

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
