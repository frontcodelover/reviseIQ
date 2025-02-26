import { FlashcardWithProgress } from '@/domain/entities/FlashcardProgress';
import { SupabaseFlashcardProgressRepository } from '@/infrastructure/backend/SupabaseFlashcardProgressRepository';
import { useEffect, useState } from 'react';

export function useFlashcardPriority(userId: string) {
  const [priorityCards, setPriorityCards] = useState<FlashcardWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const repository = new SupabaseFlashcardProgressRepository();

  const fetchPriorityCards = async () => {
    try {
      setIsLoading(true);
      const cards = await repository.getPriorityFlashcards(userId);
      setPriorityCards(cards);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Erreur inconnue'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPriorityCards();
    }
  }, [userId]);

  return { priorityCards, isLoading, error, refetch: fetchPriorityCards };
}
