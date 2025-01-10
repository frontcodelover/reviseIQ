import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getBackend } from '@/services/backend';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('fetchProfile');
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const backend = getBackend();
        const userProfile = await backend.getUserProfile(user.id);
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
