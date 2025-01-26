import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';
import { Flashcard } from '@/domain/entities/Flashcard';

export class GetFlashcardsUseCase {
  constructor(private flashcardRepository: FlashcardRepository) {}

  async execute(deckId: string): Promise<Flashcard[]> {
    return this.flashcardRepository.getFlashcards(deckId);
  }
}
