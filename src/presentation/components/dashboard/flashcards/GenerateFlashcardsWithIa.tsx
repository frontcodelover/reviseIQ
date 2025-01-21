import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { GenerateFlashcardsUseCase } from '@/application/useCases/GenerateFlashcards.usecase';
import { CreateFlashcardUseCase } from '@/application/useCases/CreateFlashcard.usecase';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { Flashcard } from '@/domain/entities/Flashcard';

const flashcardRepository = new SupabaseFlashCardRepository();
const generateFlashcard = new GenerateFlashcardsUseCase(flashcardRepository);
const createFlashcard = new CreateFlashcardUseCase(flashcardRepository);

export function GenerateFlashCardWithIa() {
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateFlashcard.execute(topic);
      setGeneratedCards(result);
      if (deckId) {
        await flashcardRepository.storeQuiz(deckId, result);
      }
    } catch {
      setError('Erreur lors de la génération des flashcards');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const card of generatedCards) {
        await createFlashcard.execute({
          deck_id: deckId,
          question: card.question,
          answer: card.answer,
        });
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch {
      setError('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Générer avec l'IA</h2>
      {error && <div className="text-red-500">{error}</div>}

      <Input
        type="text"
        placeholder="Entrez un sujet (e.g., Javascript)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Button onClick={generateFlashcards} disabled={!topic.trim() || loading} className="w-full">
        {loading ? 'Génération...' : 'Générer des flashcards'}
      </Button>

      {generatedCards.length > 0 && (
        <>
          <div className="space-y-2">
            {generatedCards.map((card, index) => (
              <div key={index} className="rounded border p-4">
                <p>
                  <strong>Question:</strong> {card.question}
                </p>
                <p>
                  <strong>Réponse:</strong> {card.answer}
                </p>
                <p>
                  <strong>Mauvaises réponses:</strong> {card.wrongAnswers?.join(', ')}
                </p>
              </div>
            ))}
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Sauvegarder les flashcards
          </Button>
        </>
      )}
    </div>
  );
}
