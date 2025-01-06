import { useEffect, useState } from 'react';
import { getBackend } from '../services/backend';
import { useTranslation } from 'react-i18next';
import CardFolder from '@/components/dashboard/folders/cardFolder';

// Utiliser l'interface Deck du backend
import type { Deck } from '../services/backend';
import CardNewFolder from '@/components/dashboard/folders/cardNewFolder';

function UserDecks(): JSX.Element {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const backend = getBackend();
        const data = await backend.getUserDecks();
        // Vérifier que data est bien un tableau de Deck
        if (Array.isArray(data)) {
          setDecks(data as Deck[]);
        } else {
          setDecks([]);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des decks utilisateur :',
          error
        );
        setDecks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDecks();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">{t('loading')}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        {t('dashboard.folder.yourfolder')}
      </h1>
      <div className="flex flex-col gap-6">
        <CardNewFolder />
        {decks.length === 0 ? (
          <p className="text-center text-gray-500">
            {t('dashboard.folder.nofolder')}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <CardFolder key={deck.id} {...deck} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDecks;
