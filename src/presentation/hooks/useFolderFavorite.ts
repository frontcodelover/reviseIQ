import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

export function useFolderFavorite(deck_id: string) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const queryClient = useQueryClient();

  // Load initial favorite status
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user?.id || !deck_id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Check if the folder is in user's favorites
        const status = await appContainer.getFavoriteService().isFolderFavorite(user.id, deck_id);
        // Get count of followers for this folder
        const count = await appContainer.getFavoriteService().getFolderFollowersCount(deck_id);
        setIsFavorite(status);
        setFollowersCount(count);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [user?.id, deck_id]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async () => {
    if (!user?.id || !deck_id) return;

    try {
      setIsLoading(true);

      if (isFavorite) {
        // Remove from favorites
        await appContainer.getFavoriteService().removeFavorite(user.id, deck_id);
        setFollowersCount((prev) => Math.max(0, prev - 1));
      } else {
        // Add to favorites
        await appContainer.getFavoriteService().addFavorite(user.id, deck_id);
        setFollowersCount((prev) => prev + 1);
      }

      setIsFavorite(!isFavorite);

      // Invalidate queries to force data refresh
      queryClient.invalidateQueries(['folders']);
      queryClient.invalidateQueries(['userFavorites']);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, deck_id, isFavorite, queryClient]);

  return {
    isFavorite,
    isLoading,
    followersCount,
    toggleFavorite,
  };
}
