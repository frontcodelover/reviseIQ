// get user infos by id
import { useState, useEffect } from 'react';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { GetUserProfileByIdUseCase } from '@/application/useCases/user/GetUserProfilById.usecase';

import { User } from '@/domain/entities/User';

const userRepository = new SupabaseUserRepository();
const getUserProfileByIdUseCase = new GetUserProfileByIdUseCase(userRepository);

export const useProfileUserById = (userId: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfileByIdUseCase.execute(userId);
        setProfile(userProfile);
      } catch (err) {
        setError('Erreur lors de la récupération du profil');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
};
