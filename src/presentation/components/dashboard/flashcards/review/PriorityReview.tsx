import { ReviewQuality } from '@/domain/entities/FlashcardProgress';
import { FlashcardProgressUpdate } from '@/domain/entities/FlashcardProgress';
import { SpacedRepetitionService } from '@/domain/services/SpacedRepetitionService';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { Button } from '@/presentation/components/ui/button';
import { Card } from '@/presentation/components/ui/card';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useFlashcardPriority } from '@/presentation/hooks/useFlashcardPriority';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function PriorityReview() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { priorityCards, isLoading, error, refetch } = useFlashcardPriority(profile?.user_id ?? '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const flashcardProgressRepository = appContainer.getFlashcardProgressRepository();

  // Calculer les cartes restantes avec vérification
  const remainingCards = priorityCards.filter(
    (card) => !reviewedCards.has(card.id) && card.flashcard
  );

  const handleReveal = () => setIsAnswerRevealed(true);

  const handleReview = async (quality: ReviewQuality) => {
    try {
      const currentCard = remainingCards[currentIndex];

      const nextReview = SpacedRepetitionService.calculateNextReview(currentCard, quality);

      const progressUpdate: FlashcardProgressUpdate = {
        id: currentCard.id,
        flashcard_id: currentCard.flashcard_id,
        user_id: currentCard.user_id,
        easiness_factor: nextReview.easiness_factor ?? currentCard.easiness_factor,
        interval: nextReview.interval ?? currentCard.interval,
        repetitions: nextReview.repetitions ?? currentCard.repetitions,
        due_date: nextReview.due_date ?? new Date(),
        last_reviewed: nextReview.last_reviewed ?? new Date(),
      };

      // Mettre à jour la progression dans la base de données
      await flashcardProgressRepository.updateFlashcardProgress(progressUpdate);

      // Marquer la carte comme révisée
      setReviewedCards((prev) => new Set([...prev, currentCard.id]));

      // Vérifier s'il reste des cartes à réviser
      const nextRemainingCards = priorityCards.filter(
        (card) => !reviewedCards.has(card.id) && card.flashcard && card.id !== currentCard.id
      );

      if (nextRemainingCards.length === 0) {
        toast('Session terminée !', {
          description: `Vous avez révisé ${reviewedCards.size + 1} cartes.`,
          style: {
            backgroundColor: '#0c0a09',
            color: '#fff',
            border: '1px solid #27272a',
          },
        });

        // Ajouter un délai avant la redirection
        setTimeout(() => {
          navigate('/dashboard', {
            state: {
              message: 'Session de révision terminée ! 🎉',
              reviewedCount: reviewedCards.size + 1,
            },
          });
        }, 2500);

        return;
      }

      setCurrentIndex(0);
      setIsAnswerRevealed(false);

      toast(quality >= ReviewQuality.Good ? 'Bien joué ! 🎉' : 'Continuez à pratiquer ! 💪');
    } catch (error) {
      console.error('Erreur lors de la révision:', error);
      toast('Erreur', {
        description: 'Impossible de sauvegarder votre progression',
      });
    }
  };

  if (isLoading) return <Skeleton className="h-[200px] w-full" />;
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Une erreur est survenue</p>
        <Button onClick={refetch} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }
  if (priorityCards.length === 0) {
    return (
      <Card className="mt-6 flex flex-col items-center justify-center p-6">
        <ConfettiExplosion />
        <h2 className="mb-2 text-xl font-semibold">Félicitations ! 🎉</h2>
        <p className="text-muted-foreground">
          Vous n'avez aucune carte prioritaire à réviser pour le moment.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">
          Retour au tableau de bord
        </Button>
      </Card>
    );
  }

  if (remainingCards.length === 0) {
    return (
      <Card className="mt-6 flex flex-col items-center justify-center p-6">
        <ConfettiExplosion />
        <h2 className="mb-2 text-xl font-semibold">Session terminée ! 🎉</h2>
        <p className="text-muted-foreground">
          Vous avez révisé toutes les cartes de cette session.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">
          Retour au tableau de bord
        </Button>
      </Card>
    );
  }

  const currentCard = remainingCards[currentIndex];
  if (!currentCard || !currentCard.flashcard) {
    return (
      <Card className="p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">Erreur de chargement</h2>
        <p className="text-muted-foreground">Impossible de charger la carte. Veuillez réessayer.</p>
        <Button onClick={refetch} className="mt-4">
          Recharger
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Révision Prioritaire</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/dashboard')} size="sm" variant="outline">
            Terminer
          </Button>
        </div>
      </div>

      {/* Carte principale avec vérification */}
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="mb-4 space-y-2">
            <h3 className="text-lg font-medium">Question :</h3>
            <p className="text-lg">{currentCard.flashcard.question}</p>
          </div>

          <div
            className={cn(
              'mt-6 space-y-2',
              !isAnswerRevealed && 'blur-sm transition-all hover:blur-none'
            )}
          >
            <h3 className="text-lg font-medium">Réponse :</h3>
            <p className="text-lg">{currentCard.flashcard.answer}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t bg-muted/50 p-4">
          {!isAnswerRevealed ? (
            <Button onClick={handleReveal} className="w-full">
              Révéler la réponse
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="destructive"
                onClick={() => handleReview(ReviewQuality.BlackOut)}
                className="w-full"
              >
                Je ne sais pas 😅
              </Button>
              <Button
                variant="default"
                onClick={() => handleReview(ReviewQuality.Perfect)}
                className="w-full"
              >
                Je sais ! 🎉
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Barre de progression */}
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm">
          <span>Difficulté: {currentCard.easiness_factor.toFixed(1)}</span>
          <span>Révisions: {currentCard.repetitions}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${Math.min((currentCard.easiness_factor / 2.5) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
