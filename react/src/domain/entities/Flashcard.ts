export interface Flashcard {
  id?: string | number;
  deck_id: string | number | undefined;
  question: string;
  answer: string;
  wrong_one?: string;
  wrong_two?: string;
  wrong_three?: string;
  ia_generated?: boolean;
  lang?: string;
}

export type FlashcardUpdate = {
  question?: string;
  answer?: string;
  wrongAnswers?: string[];
};

export interface GetFlashcardsProps {
  isOwner: boolean;
}

export interface FlashcardProgress {
  id: string;
  flashcard_id: string;
  user_id: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  due_date: Date;
  last_reviewed: Date | null;
  created_at: Date;
}

export interface FlashcardProgressUpdateData {
  id: string;
  flashcard_id: string;
  user_id: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  due_date: Date;
  last_reviewed: Date | null;
}
