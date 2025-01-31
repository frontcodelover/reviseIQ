export interface Flashcard {
  id?: string | number;
  deck_id?: string | number;
  question: string;
  answer: string;
  wrongAnswers?: string[];
  ia_generated?: boolean;
  lang?: string;
}
