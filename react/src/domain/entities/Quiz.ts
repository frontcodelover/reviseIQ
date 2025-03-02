export interface QuizQuestion {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export interface Quiz {
  id: string;
  deck_id: string;
  questions: QuizQuestion[];
}
