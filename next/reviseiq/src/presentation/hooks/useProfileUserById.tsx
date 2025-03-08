'use client';
import { User } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useQuery } from '@tanstack/react-query';

interface ProfileResult {
  profile: User | null;
  isLoading: boolean;
  error: Error | null;
}

export const useProfileUserById = (userId: string): ProfileResult => {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async (): Promise<User> => {
      try {
        const profile = await appContainer.getUserService().getUserProfile(userId);
        if (!profile) {
          throw new Error('Profil non trouvé');
        }
        return profile;
      } catch (err) {
        throw new Error('Erreur lors de la récupération du profil' + err);
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    enabled: Boolean(userId),
  });

  // Gestion des erreurs au niveau du composant
  if (error) {
    console.error('Error fetching profile:', error);
  }

  return {
    profile: data || null,
    isLoading,
    error,
    ...rest,
  };
};
