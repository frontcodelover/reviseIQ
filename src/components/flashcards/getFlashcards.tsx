import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBackend } from '@/services/backend';

function GetFlashcards() {
  const { id: deckId } = useParams<{ id: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) return;
      
      try {
        const backend = getBackend();
        const cards = await backend.getFlashcards(deckId);
        setFlashcards(cards);
      } catch (err) {
        setError("Erreur lors du chargement des flashcards");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [deckId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!flashcards.length) return <div>Aucune flashcard trouvée</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flashcards.map((card) => (
        <div key={card.id} className="p-4 border rounded-lg shadow">
          <h3 className="font-bold mb-2">Question:</h3>
          <p className="mb-4">{card.question}</p>
          <h3 className="font-bold mb-2">Réponse:</h3>
          <p>{card.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default GetFlashcards;