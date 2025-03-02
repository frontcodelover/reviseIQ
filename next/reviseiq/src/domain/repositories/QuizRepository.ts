// Quiz Repository
import { Quiz } from '@/domain/entities/Quiz';

export interface QuizRepository {
  getQuizByDeckId(deckId: string): Promise<Quiz>;
}
