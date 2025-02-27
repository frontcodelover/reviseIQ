import { z } from 'zod';

// 1. Définir les interfaces une seule fois
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  created_at: Date;
}

export interface IFlashcardProgress {
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

export interface IFlashcardProgressUpdate {
  id: string;
  flashcard_id: string;
  user_id: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  due_date: Date;
  last_reviewed: Date | null;
}

export interface FlashcardWithProgress extends FlashcardProgress {
  flashcard: Flashcard;
}

export type SpacedRepetitionCalcResult = Omit<
  FlashcardProgressUpdate,
  'id' | 'flashcard_id' | 'user_id'
>;

export enum ReviewQuality {
  BlackOut = 0,
  Wrong = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
  Perfect = 5,
}

// 2. Si vous utilisez Zod, alignez les schémas avec les interfaces
export const FlashcardSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  answer: z.string(),
  created_at: z.coerce.date(),
});

export const FlashcardProgressSchema = z.object({
  id: z.string(),
  flashcard_id: z.string(),
  user_id: z.string(),
  easiness_factor: z.number(),
  interval: z.number(),
  repetitions: z.number(),
  due_date: z.date(),
  last_reviewed: z.date().nullable(),
  created_at: z.date(),
});

// Type spécifique pour la mise à jour, sans created_at
export const FlashcardProgressUpdateSchema = FlashcardProgressSchema.omit({
  created_at: true,
});

// Types inférés pour usage dans l'application
export type FlashcardProgress = z.infer<typeof FlashcardProgressSchema>;
export type FlashcardProgressUpdate = z.infer<typeof FlashcardProgressUpdateSchema>;

export const FlashcardWithProgressSchema = FlashcardProgressSchema.extend({
  flashcard: FlashcardSchema,
});
