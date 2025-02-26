import { ReviewQuality } from '@/domain/entities/FlashcardProgress';
import { SpacedRepetitionService } from '@/domain/services/SpacedRepetitionService';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { DockNavigate } from '@/presentation/components/dashboard/dock/DockNavigate';
import { CreateFlashcards } from '@/presentation/components/dashboard/flashcards/display/CreateFlashcards';
import { EndCard } from '@/presentation/components/dashboard/flashcards/display/EndFlashcard';
import { FlashcardCard } from '@/presentation/components/dashboard/flashcards/display/FlashcardDisplay';
import { useFlashcardsStore } from '@/presentation/components/dashboard/flashcards/display/store/useFlashcards.store';
import { Button } from '@/presentation/components/ui/button';
import { Progress } from '@/presentation/components/ui/progress';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface GetFlashcardsProps {
  isOwner: boolean;
}

export function GetFlashcards({ isOwner }: GetFlashcardsProps) {
  const { id: deckId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string | null>(null);

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

  // Ajouter cette effet pour récupérer l'userId
  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);

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

  const handleReview = async (quality: ReviewQuality) => {
    // Vérification plus stricte des valeurs requises
    if (!currentCard?.id || !userId) {
      console.warn('Données manquantes pour la révision:', {
        cardId: currentCard?.id,
        userId,
      });
      return;
    }

    if (typeof currentCard.id !== 'string') {
      console.warn("L'ID de la carte doit être un nombre:", currentCard.id);
      return;
    }

    try {
      const flashcardProgressRepo = appContainer.getFlashcardProgressRepository();

      // Récupérer ou créer la progression
      let progress = await flashcardProgressRepo.getFlashcardProgress(currentCard.id, userId);

      if (!progress) {
        progress = await flashcardProgressRepo.createFlashcardProgress(currentCard.id, userId);
      }

      // Vérification supplémentaire après création
      if (!progress) {
        throw new Error('Impossible de créer ou récupérer la progression');
      }

      // Utiliser directement la méthode statique
      const updatedProgress = SpacedRepetitionService.calculateNextReview(progress, quality);

      // Mettre à jour la progression
      await flashcardProgressRepo.updateFlashcardProgress({
        ...updatedProgress,
        id: progress.id, // Important : s'assurer que l'ID est présent
        flashcard_id: currentCard.id,
        user_id: userId,
      });

      // Passer à la carte suivante
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression:', error);
      // TODO: Ajouter une notification d'erreur pour l'utilisateur
    }
  };

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
      {showAnswer && (
        <div className="mt-4 flex justify-center gap-2">
          {Object.values(ReviewQuality)
            .filter((value) => typeof value === 'number')
            .map((quality) => (
              <Button
                key={quality}
                onClick={() => handleReview(quality as ReviewQuality)}
                variant={quality < 3 ? 'destructive' : 'default'}
                size="sm"
              >
                {quality === ReviewQuality.BlackOut && '😵 Oublié'}
                {quality === ReviewQuality.Wrong && '❌ Incorrect'}
                {quality === ReviewQuality.Hard && '😓 Difficile'}
                {quality === ReviewQuality.Good && '👍 Bien'}
                {quality === ReviewQuality.Easy && '😊 Facile'}
                {quality === ReviewQuality.Perfect && '✨ Parfait'}
              </Button>
            ))}
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
            isOwner={isOwner}
          />
        </>
      )}
    </div>
  );
}
