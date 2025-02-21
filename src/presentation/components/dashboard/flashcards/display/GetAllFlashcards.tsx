import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { DockNavigate } from '@/presentation/components/dashboard/dock/DockNavigate';
import EndCard from '@/presentation/components/dashboard/flashcards/display/LastFlashcard';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

interface FlashcardCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  showAnswer: boolean;
}

function FlashcardCard({ children, onClick, showAnswer }: FlashcardCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'preserve-3d min-h-[40vh] transform-gpu cursor-pointer transition-transform duration-1000',
        'shadow-md hover:shadow-lg',
        showAnswer && 'rotate-y-180'
      )}
    >
      {children}
    </Card>
  );
}

export function GetFlashcards({ isOwner }: { isOwner: boolean }) {
  const { id: deckId } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoggedCompletion, setHasLoggedCompletion] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const isLastCard = currentIndex === flashcards.length;
  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await appContainer.getUserService().getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'userId:", error);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (isLastCard && !hasLoggedCompletion && flashcards.length > 0) {
      const logCompletion = async () => {
        try {
          if (userId) {
            await appContainer
              .getLogService()
              .logAction(userId, 'flashcard_reviewed', flashcards.length);
          } else {
            console.error('User ID is null');
          }
          setHasLoggedCompletion(true);
        } catch (error) {
          console.error("Erreur lors du log de l'action :", error);
        }
      };
      logCompletion();
    }
  }, [isLastCard, hasLoggedCompletion, flashcards.length, userId]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) return;
      try {
        const cards = await appContainer.getFlashcardService().getFlashcardsList(deckId);
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
      } else if (e.code === 'ArrowRight' && currentIndex <= flashcards.length - 1) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 100); // Délai harmonisé à 1000ms
      } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
        }, 1000); // Délai harmonisé à 1000ms
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showAnswer, flashcards.length]);

  const handleRestart = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentIndex(0);
    }, 200);
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setIsShuffled(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-destructive">{error}</div>;
  }

  const currentCard = isShuffled ? shuffledCards[currentIndex] : flashcards[currentIndex];

  return flashcards.length > 0 ? (
    <div className="mt-12 flex min-h-[40vh] flex-col items-center justify-center gap-4">
      {isLastCard ? (
        <EndCard onRestart={handleRestart} />
      ) : (
        <div className="relative w-[90vh]">
          <FlashcardCard onClick={() => setShowAnswer(!showAnswer)} showAnswer={showAnswer}>
            <div className="backface-hidden absolute h-full w-full">
              <div className="flex h-full flex-col items-center justify-center rounded-lg p-6">
                <h2 className="mb-4 text-center text-2xl font-medium">
                  {t('flashcard.question')} 🤔
                </h2>
                <p className="text-center text-lg">{currentCard.question}</p>
              </div>
            </div>

            <div className="backface-hidden rotate-y-180 absolute h-full w-full">
              <div className="flex h-full flex-col items-center justify-center rounded-lg p-6">
                <h2 className="mb-4 text-center text-2xl font-medium">
                  {t('flashcard.answer')} ✅
                </h2>
                <p className="w-[90%] text-center text-lg">{currentCard.answer}</p>
              </div>
            </div>
          </FlashcardCard>
        </div>
      )}

      <Progress value={((currentIndex + 1) / flashcards.length) * 100} className="my-6 w-[80vh]" />
      <div className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Astuce : Appuyez sur la touche "A" pour afficher la réponse
        </p>
      </div>

      <DockNavigate
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setShowAnswer}
        currentIndex={currentIndex}
        flashcards={flashcards}
        deckId={deckId}
        handleShuffle={handleShuffle}
      />
    </div>
  ) : isOwner ? (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">
          Comment souhaitez-vous créer vos flashcards ?
        </h1>
        <p className="text-lg text-muted-foreground">Choisissez une option ci-dessous</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-ai`)}
          className="group h-[320px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <span className="text-4xl">🤖</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              Générer des flashcards avec l'IA
            </h3>
          </div>
        </Card>

        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-manual`)}
          className="group h-[320px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <span className="text-4xl">✍</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              Créer des flashcards manuellement
            </h3>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    <div className="py-8 text-center">
      <h2 className="mb-2 text-2xl font-semibold">Aucune flashcard n'a été trouvée.</h2>
      <p className="text-muted-foreground">
        Le propriétaire de ce deck n'a pas encore créé de flashcard
      </p>
    </div>
  );
}
