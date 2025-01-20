import { Quiz } from '@/domain/entities/Quiz';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';

export class GetQuizByDeckIdUseCase {
  constructor(private repository: SupabaseFlashCardRepository) {}

  async execute(deckId: string): Promise<Quiz | null> {
    return this.repository.getQuizByDeckId(deckId);
  }
}
