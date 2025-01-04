import { useEffect, useState } from 'react';
import { getBackend } from '../services/backend';

// Utiliser l'interface Deck du backend
import type { Deck } from '../services/backend';

function UserDecks(): JSX.Element {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

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
    return (
      <p className="text-center text-gray-500">Chargement de vos decks...</p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Vos Decks</h1>

      {decks.length === 0 ? (
        <p className="text-center text-gray-500">
          Vous n'avez pas encore créé de deck.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold">{deck.name}</h2>
              <p className="text-gray-600">{deck.description}</p>
              <p className="mt-4 text-sm text-gray-400">
                {deck.is_public ? 'Public' : 'Privé'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDecks;
