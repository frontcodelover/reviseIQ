import { FlashcardProgress, FlashcardProgressUpdate } from '@/domain/entities/FlashcardProgress';

export interface FlashcardProgressRepository {
  getFlashcardProgress(flashcardId: string, userId: string): Promise<FlashcardProgress | null>;
  updateFlashcardProgress(progress: FlashcardProgressUpdate): Promise<void>;
  getDueFlashcards(user_id: string): Promise<FlashcardProgress[]>;
  createFlashcardProgress(flashcard_id: string, user_id: string): Promise<FlashcardProgress>;
  getPriorityFlashcards(user_id: string): Promise<FlashcardProgress[]>;
}
