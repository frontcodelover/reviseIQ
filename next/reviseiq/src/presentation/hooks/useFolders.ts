'use client';
import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

export interface GroupedDecks {
  [thema: string]: Folder[];
}

export function useFolders() {
  const [decks, setDecks] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  // Utiliser useCallback pour garantir la stabilité de référence
  const fetchUserDecks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await appContainer.getUserService().getUserFolders();
      if (Array.isArray(data)) {
        setDecks(data as Folder[]);
      } else {
        setDecks([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des decks utilisateur :', error);
      setDecks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const groupedDecks = useMemo(() => {
    return decks.reduce((groups: GroupedDecks, deck) => {
      const themaKey = deck.thema || 'other';
      const translationKey = `dashboard.folder.thema.${themaKey.toLowerCase()}`;
      const translatedThema = t(translationKey);

      if (!groups[translatedThema]) {
        groups[translatedThema] = [];
      }
      groups[translatedThema].push(deck);
      return groups;
    }, {});
  }, [decks, t]);

  useEffect(() => {
    fetchUserDecks();
  }, [fetchUserDecks]);

  return {
    decks,
    loading,
    fetchUserDecks,
    groupedDecks,
    hasDecks: decks.length > 0,
  };
}
