import { DockNavigate } from '@/presentation/components/dashboard/dock/DockNavigate';
import { CreateFlashcards } from '@/presentation/components/dashboard/flashcards/display/CreateFlashcards';
import { EndCard } from '@/presentation/components/dashboard/flashcards/display/EndFlashcard';
import { FlashcardCard } from '@/presentation/components/dashboard/flashcards/display/FlashcardDisplay';
import { useFlashcardsStore } from '@/presentation/components/dashboard/flashcards/display/store/useFlashcards.store';
import { Progress } from '@/presentation/components/ui/progress';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface GetFlashcardsProps {
  isOwner: boolean;
}

export function GetFlashcards({ isOwner }: GetFlashcardsProps) {
  const { id: deckId } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    flashcards,
    currentIndex,
    showAnswer,
    loading,
    error,
    isShuffled,
    shuffledCards,
    fetchUserId,
    fetchFlashcards,
    logCompletion,
    setCurrentIndex,
    setShowAnswer,
    handleRestart,
    handleShuffle,
    resetState,
  } = useFlashcardsStore();

  // Calculer currentCard en dehors des conditions
  const currentCard = useMemo(() => {
    const cards = isShuffled ? shuffledCards : flashcards;
    return cards[currentIndex];
  }, [isShuffled, shuffledCards, flashcards, currentIndex]);

  const isLastCard = currentIndex === flashcards.length;

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (deckId) {
      fetchUserId();
      fetchFlashcards(deckId);
    }
  }, [deckId, fetchUserId, fetchFlashcards]);

  useEffect(() => {
    if (deckId && isLastCard) {
      logCompletion(deckId);
    }
  }, [deckId, isLastCard, logCompletion]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        setShowAnswer(!showAnswer);
      } else if (e.code === 'ArrowRight' && currentIndex < flashcards.length) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 100);
      } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showAnswer, flashcards.length, setCurrentIndex, setShowAnswer]);

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-destructive">{error}</div>;
  }

  if (!currentCard && !isLastCard) {
    return <div className="p-4 text-center text-muted-foreground">Aucune flashcard disponible</div>;
  }

  if (flashcards.length === 0) {
    return isOwner ? (
      <CreateFlashcards deckId={deckId!} />
    ) : (
      <div className="py-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold">{t('flashcard.noFlashcardTitle')}</h2>
        <p className="text-muted-foreground">{t('flashcard.noFlashcard')}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 flex min-h-[40vh] flex-col items-center justify-center gap-6">
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
                <p className="text-center text-lg">{currentCard?.question}</p>
              </div>
            </div>

            <div className="backface-hidden rotate-y-180 absolute h-full w-full">
              <div className="flex h-full flex-col items-center justify-center rounded-lg p-6">
                <h2 className="mb-4 text-center text-2xl font-medium">
                  {t('flashcard.answer')} ✅
                </h2>
                <p className="w-[90%] text-center text-lg">{currentCard?.answer}</p>
              </div>
            </div>
          </FlashcardCard>
        </div>
      )}
      {!isLastCard && (
        <>
          <Progress
            value={((currentIndex + 1) / flashcards.length) * 100}
            className="w-full max-w-2xl"
          />
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">{t('flashcard.hint')}</p>
          </div>

          <DockNavigate
            setCurrentIndex={(value: number | ((prev: number) => number)) =>
              typeof value === 'function'
                ? setCurrentIndex(value(currentIndex))
                : setCurrentIndex(value)
            }
            setShowAnswer={(value: boolean | ((prev: boolean) => boolean)) =>
              typeof value === 'function' ? setShowAnswer(value(showAnswer)) : setShowAnswer(value)
            }
            currentIndex={currentIndex}
            flashcards={flashcards}
            deckId={deckId}
            handleShuffle={handleShuffle}
          />
        </>
      )}
    </div>
  );
}
