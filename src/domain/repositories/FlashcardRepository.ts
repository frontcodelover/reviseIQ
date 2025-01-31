import { Flashcard } from '@/domain/entities/Flashcard';
import { FlashcardUpdate } from '@/domain/entities/Flashcard';

export interface FlashcardRepository {
  createFlashcard(flashcardData: Flashcard): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
  generateFlashcards(topic: string, number: number, lang: string): Promise<Flashcard[]>;
  updateFlashcard(
    flashcardId: string,
    deckId: string,
    userId: string,
    updates: FlashcardUpdate
  ): Promise<void>;
}
