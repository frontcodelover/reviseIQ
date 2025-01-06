import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';

export const useUserDecksCount = () => {
  const [deckCount, setDeckCount] = useState(0);

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const backend = getBackend();
        const data = await backend.getUserDecks();
        if (Array.isArray(data)) {
          setDeckCount(data.length);
        } else {
          setDeckCount(0);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des decks utilisateur :', error);
        setDeckCount(0);
      }
    };

    fetchUserDecks();
  }, []);

  return deckCount;
};
