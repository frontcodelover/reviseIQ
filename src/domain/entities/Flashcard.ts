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
