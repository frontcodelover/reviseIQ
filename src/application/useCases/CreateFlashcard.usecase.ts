import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';
import { Flashcard } from '@/domain/entities/Flashcard';

export class CreateFlashcardUseCase {
  constructor(private flashcardRepository: FlashcardRepository) {}

  async execute(flashcardData: Flashcard): Promise<void> {
    return this.flashcardRepository.createFlashcard(flashcardData);
  }
}
