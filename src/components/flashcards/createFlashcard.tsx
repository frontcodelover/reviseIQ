import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save } from 'lucide-react';
import { getBackend } from '@/services/backend';
import { useParams } from 'react-router-dom';

interface CreateFlashcardProps {
  onSuccess?: () => void;
}

function CreateFlashcard({ onSuccess }: CreateFlashcardProps) {
  const generateInitialFlashcards = (count: number): Flashcard[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index,
      question: '',
      answer: '',
    }));
  };
  
  interface Flashcard {
    id: number;
    question: string;
    answer: string;
  }
  const { id: deckId } = useParams<{ id: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    generateInitialFlashcards(5)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const backend = getBackend();

      // Sauvegarder chaque flashcard
      for (const card of flashcards) {
        if (card.question.trim() && card.answer.trim()) {
          await backend.createFlashcard({
            deck_id: deckId,
            question: card.question,
            answer: card.answer,
          });
        }
      }

      onSuccess?.();
    } catch (err) {
      setError('Erreur lors de la création des flashcards');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = () => {
    const newId = flashcards.length + 1;
    setFlashcards([...flashcards, { id: newId, question: '', answer: '' }]);
  };

  const removeFlashcard = (id: number) => {
    if (flashcards.length > 1) {
      setFlashcards(flashcards.filter((card) => card.id !== id));
    }
  };

  const updateFlashcard = (
    id: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <div className="space-y-4">
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {flashcards.map((card) => (
        <div key={card.id} className="flex items-center gap-2">
          <Input
            className="h-12"
            type="text"
            placeholder="Question"
            value={card.question}
            onChange={(e) =>
              updateFlashcard(card.id, 'question', e.target.value)
            }
          />
          <Input
            className="h-12"
            type="text"
            placeholder="Réponse"
            value={card.answer}
            onChange={(e) => updateFlashcard(card.id, 'answer', e.target.value)}
          />
          {flashcards.length > 1 && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeFlashcard(card.id)}
              className="flex h-12 w-24 items-center justify-center"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addFlashcard}
      >
        <Plus className="h-4 w-4" />
        Ajouter une carte
      </Button>
      <Button
        type="button"
        variant="default"
        className="flex-1"
        onClick={handleSubmit}
        disabled={loading}
      >
        <Save className="mr-2 h-4 w-4" />
        {loading ? 'Sauvegarde...' : 'Sauvegarder'}
      </Button>
    </div>
  );
}

export default CreateFlashcard;
