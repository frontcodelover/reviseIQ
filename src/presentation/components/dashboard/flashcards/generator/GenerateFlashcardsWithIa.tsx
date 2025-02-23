import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { Card } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { Progress } from '@/presentation/components/ui/progress';
import { Slider } from '@/presentation/components/ui/slider';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function GenerateFlashCardWithIa() {
  const lang = localStorage.getItem('i18nextLng') || 'fr';
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [number, setNumber] = useState(10);
  const [progress, setProgress] = useState(0);

  const fetchData = useCallback(async () => {
    if (deckId) {
      try {
        const folder = await appContainer.getFolderService().getFolderById(deckId);
        setTopic(folder.name);
      } catch (e: unknown) {
        setError((e as Error).message || 'An unexpected error occurred.');
      }
    }
  }, [deckId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading && progress < 99) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 3, 99));
      }, 1500);
    }

    if (!loading) {
      setProgress(0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [loading, progress]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await appContainer
        .getFlashcardService()
        .generateFlashcards(topic, number, lang);

      // Assuming the service returns a JSON string, parse it
      const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

      // Check if parsedResult is an array before setting the state
      if (Array.isArray(parsedResult)) {
        setGeneratedCards(parsedResult);
      } else if (typeof parsedResult === 'object' && parsedResult !== null) {
        // If it's an object, create an array containing that object
        setGeneratedCards([parsedResult]);
      } else {
        setError('Erreur lors de la génération des flashcards: Données invalides.');
      }
    } catch (e: unknown) {
      setError('Erreur lors de la génération des flashcards');
      console.error('Flashcard generation failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!generateFlashcards) {
      return;
    }
    try {
      for (const card of generatedCards) {
        await appContainer.getFlashcardService().createFlashcard({
          deck_id: deckId,
          question: card.question,
          answer: card.answer,
          ia_generated: true,
          wrong_one: card.wrong_one,
          wrong_two: card.wrong_two,
          wrong_three: card.wrong_three,
        });
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch (e: unknown) {
      setError('Erreur lors de la sauvegarde');
      console.error('Flashcard save failed:', e);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-foreground">Générer avec l'IA</h2>

      {error && <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>}

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">
            Générez des flashcards automatiquement en entrant un sujet et le nombre de flashcards
            souhaité.
          </h2>

          <Input
            type="text"
            placeholder="Entrez un sujet (e.g., Javascript)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="number-slider">Nombre de flashcards</Label>
          <Slider
            id="number-slider"
            value={[number]}
            onValueChange={(value) => setNumber(value[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{number} flashcards</span>
        </div>

        <Button onClick={generateFlashcards} disabled={!topic.trim() || loading} className="w-full">
          {loading ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Génération en cours...
            </>
          ) : (
            'Générer des flashcards'
          )}
        </Button>
      </div>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <Progress value={progress} className="w-[60%]" />
          <p className="text-center text-lg text-muted-foreground">
            La génération des flashcards est en cours...
            <br />
            La durée de ce processus dépend de la taille du sujet (environ 30 secondes).
          </p>
        </div>
      )}

      {generatedCards.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-4">
            {generatedCards.map((card: Flashcard, index: number) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question:</Label>
                    <Input type="text" value={card.question} readOnly className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label>Réponse:</Label>
                    <p className="rounded-md bg-muted p-4">{card.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Sauvegarder les flashcards
          </Button>
        </div>
      )}
    </div>
  );
}
