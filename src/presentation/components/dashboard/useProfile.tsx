import { useState, useEffect } from 'react';
import { useAuth } from '@/presentation/context/AuthContext';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { GetUserProfileByIdUseCase } from '@/application/useCases/GetUserProfilById.usecase';

import { User } from '@/domain/entities/User';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userRepository = new SupabaseUserRepository();
  const getUserProfileById = new GetUserProfileByIdUseCase(userRepository);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getUserProfileById.execute(user.id!);
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
