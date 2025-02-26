import { FlashcardProgress } from '@/domain/entities/FlashcardProgress';

export interface FlashcardProgressRepository {
  getFlashcardProgress(flashcard_id: string, user_id: string): Promise<FlashcardProgress | null>;
  updateFlashcardProgress(progress: FlashcardProgress): Promise<void>;
  getDueFlashcards(user_id: string): Promise<FlashcardProgress[]>;
  createFlashcardProgress(flashcard_id: string, user_id: string): Promise<FlashcardProgress>;
  getPriorityFlashcards(user_id: string): Promise<FlashcardProgress[]>;
}
