import { Flashcard } from '@/domain/entities/Flashcard';

export interface FlashcardRepository {
  createFlashcard(flashcardData: Flashcard): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
  generateFlashcards(topic: string, number: number): Promise<Flashcard[]>;
}
