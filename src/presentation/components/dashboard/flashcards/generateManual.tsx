import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { SupabaseFlashCardRepository } from '@/infrasctructure/backend/SupabaseFlashcardRepository';
import { CreateFlashcardUseCase } from '@/application/useCases/CreateFlashcard.usecaste';

import { useParams, useNavigate } from 'react-router-dom';

const flashcardRepository = new SupabaseFlashCardRepository();
const createFlashcard = new CreateFlashcardUseCase(flashcardRepository);

function GenerateFlashcardManual() {
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([
    { id: Date.now() as number, question: '', answer: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: Date.now(), question: '', answer: '' }]);
  };

  const updateFlashcard = (id: number, field: 'question' | 'answer', value: string) => {
    setFlashcards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const removeFlashcard = (id: number) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const card of flashcards) {
        if (card.question.trim() && card.answer.trim()) {
          await createFlashcard.execute({
            deck_id: deckId,
            question: card.question,
            answer: card.answer,
          });
        }
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch {
      setError('Erreur lors de la création des flashcards');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Créer manuellement</h2>
      {error && <div className="text-red-500">{error}</div>}

      {flashcards.map((card) => (
        <div key={card.id} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Question"
            value={card.question}
            onChange={(e) => updateFlashcard(card.id, 'question', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Réponse"
            value={card.answer}
            onChange={(e) => updateFlashcard(card.id, 'answer', e.target.value)}
          />
          <Button variant="destructive" size="icon" onClick={() => removeFlashcard(card.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button onClick={addFlashcard} className="w-full">
        <Plus className="h-4 w-4" /> Ajouter une carte
      </Button>

      <Button
        onClick={handleSubmit}
        disabled={loading || flashcards.length === 0}
        className="w-full"
      >
        {loading ? 'Sauvegarde...' : 'Sauvegarder les flashcards'}
      </Button>
    </div>
  );
}

export default GenerateFlashcardManual;
