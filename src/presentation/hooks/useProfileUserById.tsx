import { User } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useQuery } from 'react-query';

export const useProfileUserById = (userId: string) => {
  const { data, isLoading, error, ...rest } = useQuery<User, Error>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      try {
        const profile = await appContainer.getUserService().getUserProfile(userId);
        if (!profile) {
          throw new Error('Profil non trouvé');
        }
        return profile;
      } catch {
        throw new Error('Erreur lors de la récupération du profil');
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 2,
    enabled: Boolean(userId),
    onError: (error) => {
      console.error('Error fetching profile:', error);
    },
  });

  return {
    profile: data,
    isLoading,
    error,
    ...rest,
  };
};
