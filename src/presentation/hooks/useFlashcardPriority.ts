import { FlashcardWithProgress } from '@/domain/entities/FlashcardProgress';
import { SupabaseFlashcardProgressRepository } from '@/infrastructure/backend/SupabaseFlashcardProgressRepository';
import { useCallback, useEffect, useState } from 'react';

export function useFlashcardPriority(userId: string) {
  const [priorityCards, setPriorityCards] = useState<FlashcardWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const repository = new SupabaseFlashcardProgressRepository();

  const fetchPriorityCards = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const cards = await repository.getPriorityFlashcards(userId);
      setPriorityCards(cards);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Erreur inconnue'));
      setPriorityCards([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPriorityCards();
  }, [fetchPriorityCards]);

  return {
    priorityCards,
    isLoading,
    error,
    refetch: fetchPriorityCards,
  };
}
