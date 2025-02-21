import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const FlashcardSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

type Flashcard = z.infer<typeof FlashcardSchema>;

export function GenerateFlashcardManual() {
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: Date.now(), question: '', answer: '' },
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
        // Validate flashcard data with FlashcardSchema
        FlashcardSchema.parse(card);
        if (card.question.trim() && card.answer.trim()) {
          await appContainer.getFlashcardService().createFlashcard({
            deck_id: deckId,
            question: card.question,
            answer: card.answer,
            ia_generated: false,
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
    <div className="flex flex-col space-y-6 p-4">
      <h2 className="text-2xl font-bold text-foreground">Créer manuellement</h2>

      {error && <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>}

      <div className="space-y-4">
        {flashcards.map((card) => (
          <div key={card.id} className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Question"
              value={card.question}
              onChange={(e) => updateFlashcard(card.id, 'question', e.target.value)}
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="Réponse"
              value={card.answer}
              onChange={(e) => updateFlashcard(card.id, 'answer', e.target.value)}
              className="flex-1"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeFlashcard(card.id)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <Button variant="outline" onClick={addFlashcard} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une carte
        </Button>

        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={loading || flashcards.length === 0}
          className="w-full"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder les flashcards'}
        </Button>
      </div>
    </div>
  );
}
