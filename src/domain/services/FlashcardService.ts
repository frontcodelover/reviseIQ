import { Flashcard } from '@/domain/entities/Flashcard';
import { Quiz } from '@/domain/entities/Quiz';
import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';

export class FlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  getFlashcardsList(deckId: string): Promise<Flashcard[]> {
    return this.flashcardRepository.getFlashcards(deckId);
  }

  createFlashcard(flashcardData: Flashcard): Promise<void> {
    return this.flashcardRepository.createFlashcard(flashcardData);
  }

  generateFlashcards(
    topic: string,
    number: number,
    lang: string,
    level: string
  ): Promise<Flashcard[]> {
    return this.flashcardRepository.generateFlashcards(topic, number, lang, level);
  }

  generateWithText(text: string, number: number, lang: string): Promise<Flashcard[]> {
    return this.flashcardRepository.generateWithText(text, number, lang);
  }

  getQuizByFolderId(folderId: string): Promise<Quiz | null> {
    return this.flashcardRepository.getQuizByFolderId(folderId);
  }
}
