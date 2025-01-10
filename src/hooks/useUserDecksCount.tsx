import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';

export const useUserDecksCount = () => {
  const [deckCount, setDeckCount] = useState(null as null | number | string);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refresh = () => {
    setRefreshTrigger(true);
  };

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const backend = getBackend();
        const data = await backend.getUserDecks();
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
        console.error(
          'Erreur lors de la récupération des decks utilisateur :',
          error
        );
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
