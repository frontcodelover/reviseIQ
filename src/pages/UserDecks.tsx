import { useEffect, useState } from 'react';
import { getBackend } from '../services/backend';

function UserDecks() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const backend = getBackend();
        const data = await backend.getUserDecks();
        setDecks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des decks utilisateur :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDecks();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement de vos decks...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Vos Decks</h1>

      {decks.length === 0 ? (
        <p className="text-center text-gray-500">Vous n'avez pas encore créé de deck.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{deck.name}</h2>
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
