import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBackend } from '@/services/backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EndCard = ({ onRestart }: { onRestart: () => void }) => (
  <div className="min-h-[60vh] w-[calc(100%-10vw)]">
    <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-white p-6 shadow">
      <h3 className="mb-6 text-xl font-bold">Félicitations !</h3>
      <p className="mb-8 text-center text-lg">
        Vous avez terminé toutes les flashcards
      </p>
      <button
        onClick={onRestart}
        className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Recommencer
      </button>
    </div>
  </div>
);

function GetFlashcards() {
  const { id: deckId } = useParams<{ id: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isLastCard = currentIndex === flashcards.length;

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) return;
      try {
        const backend = getBackend();
        const cards = await backend.getFlashcards(deckId);
        setFlashcards(cards);
      } catch {
        setError('Erreur lors du chargement des flashcards');
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, [deckId]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        setShowAnswer(!showAnswer);
      } else if (
        e.code === 'ArrowRight' &&
        currentIndex < flashcards.length
      ) {
        setCurrentIndex((prev) => prev + 1);
        setShowAnswer(false);
      } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setShowAnswer(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showAnswer, flashcards.length]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!flashcards.length) return <div>Aucune flashcard trouvée</div>;

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      {isLastCard ? (
        <EndCard onRestart={handleRestart} />
      ) : (
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className={`perspective-1000 transform-style-preserve-3d min-h-[60vh] w-[calc(100%-10vw)] cursor-pointer transition-transform duration-500 ${
            showAnswer ? 'rotate-y-180' : ''
          }`}
        >
          <div className="backface-hidden absolute h-full w-full">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold">Question 🤔</h3>
              <p className="text-center text-lg">{currentCard.question}</p>
            </div>
          </div>
          <div className="backface-hidden rotate-y-180 absolute h-full w-full">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold">Réponse ✅</h3>
              <p className="text-center text-lg">{currentCard.answer}</p>
            </div>
          </div>
        </div>
      )}
      <p className="hidden text-sm italic sm:flex">
        Astuce : Appuyez sur la touche "A" pour afficher la réponse
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setCurrentIndex((prev) => prev + 1);
            setShowAnswer(false);
          }}
          disabled={currentIndex === 0}
          className="rounded p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {flashcards.length +1}
        </span>
        <button
          onClick={() => {
            setCurrentIndex((prev) => prev + 1);
            setShowAnswer(false);
          }}
          disabled={currentIndex === flashcards.length - 1}
          className="rounded p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default GetFlashcards;
