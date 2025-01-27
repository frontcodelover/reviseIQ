import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingScreen from '@/presentation/pages/LoadingScreen';
import { useParams, useNavigate } from 'react-router-dom';
import { GenerateFlashcardsUseCase } from '@/application/useCases/flashcard/GenerateFlashcards.usecase';
import { CreateFlashcardUseCase } from '@/application/useCases/flashcard/CreateFlashcard.usecase';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { Flashcard } from '@/domain/entities/Flashcard';
import Text from '@/presentation/components/ui/text/Text';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetFolderById } from '@/application/useCases/folder/GetFolderById.usecase';

const flashcardRepository = new SupabaseFlashCardRepository();
const generateFlashcard = new GenerateFlashcardsUseCase(flashcardRepository);
const createFlashcard = new CreateFlashcardUseCase(flashcardRepository);

const folderRepository = new SupabaseFolderRepository();
const getFolderById = new GetFolderById(folderRepository);

export function GenerateFlashCardWithIa() {
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [number, setNumber] = useState(5);

  useEffect(() => {
    async function fetchData() {
      if (deckId) {
        const folder = await getFolderById.execute(deckId);
        setTopic(folder.name);
      }
    }
    fetchData();
  }, [deckId]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateFlashcard.execute(topic, number);
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
          ia_generated: true,
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

      <Input
        type="number"
        placeholder="Nombre de flashcards"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <Button onClick={generateFlashcards} disabled={!topic.trim() || loading} className="w-full">
        {loading ? (
          <>
            <span>Génération en cours...</span>
          </>
        ) : (
          'Générer des flashcards'
        )}
      </Button>

      {loading && (
        <div className="mt-4 flex flex-col items-center">
          <LoadingScreen aria-label="Generating flashcards" />
          <Text color="black" align="center">
            La génération des flashcards est en cours... La durée de ce processus dépend de la
            taille du sujet (environ 30 secondes).
          </Text>
        </div>
      )}

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
