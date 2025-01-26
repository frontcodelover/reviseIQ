import { useState, useEffect } from 'react';

import { GetUserDecksUseCase } from '@/application/useCases/user/GetUserDecks.usecase';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

const userRepository = new SupabaseUserRepository();
const getUserDecks = new GetUserDecksUseCase(userRepository);

export const useUserDecksCount = () => {
  const [deckCount, setDeckCount] = useState(null as null | number | string);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refresh = () => {
    setRefreshTrigger(true);
  };

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const data = await getUserDecks.execute();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            setDeckCount(data.length);
          } else {
            setDeckCount('0');
          }
        } else {
          setDeckCount(0);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des decks utilisateur :', error);
        setDeckCount(0);
      }
    };

    fetchUserDecks();
  }, [refreshTrigger, refresh]); // Ajout de la dépendance refresh

  return {
    deckCount,
    refresh,
  };
};
