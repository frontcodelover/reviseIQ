import { User } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userProfile = await appContainer.getUserService().getUserProfile(user.id);
        setProfile(userProfile);
      } catch (err) {
        setError('Erreur lors de la récupération du profil');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};
