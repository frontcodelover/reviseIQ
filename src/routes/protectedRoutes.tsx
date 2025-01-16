import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/presentation/context/AuthContext';
import { useState, useEffect, useCallback } from 'react';

import LoadingScreen from '@/presentation/pages/LoadingScreen';

import { SupabaseUserRepository } from '@/infrasctructure/backend/SupabaseUserRepository';
import { HasUserProfileUseCase } from '@/application/useCases/HasUserProfile.usecase';

const userRepository = new SupabaseUserRepository();
const hasUserProfile = new HasUserProfileUseCase(userRepository);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Fonction pour vérifier le profil
  const checkUserProfile = useCallback(async () => {
    if (user) {
      const profile = await hasUserProfile.execute(user.id);
      setHasProfile(profile);
      setCheckingProfile(false);
    }
  }, [user]);

  // Effet pour la vérification initiale
  useEffect(() => {
    checkUserProfile();
  }, [user, checkUserProfile]);

  // Écouteur d'événement pour la mise à jour du profil
  useEffect(() => {
    const handleProfileUpdate = async (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Profile update event received:', customEvent.detail);
      await checkUserProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
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
