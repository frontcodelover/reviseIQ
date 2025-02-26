import { z } from 'zod';

export const FlashcardProgressSchema = z
  .object({
    id: z.string().uuid(),
    flashcard_id: z.string().uuid(),
    user_id: z.string().uuid(),
    easiness_factor: z.number().min(1.3).default(2.5),
    interval: z.number().min(0).default(0),
    repetitions: z.number().min(0).default(0),
    due_date: z.coerce.date(),
    last_reviewed: z.coerce.date().nullable(),
    created_at: z.coerce.date().default(() => new Date()),
  })
  .strict();

export const UpdateFlashcardProgressSchema = z
  .object({
    easiness_factor: z.number().min(1.3),
    interval: z.number().min(0),
    repetitions: z.number().min(0),
    due_date: z.string().datetime().or(z.date()),
    last_reviewed: z.string().datetime().nullable().or(z.date().nullable()),
  })
  .transform((data) => ({
    ...data,
    due_date: typeof data.due_date === 'string' ? data.due_date : data.due_date.toISOString(),
    last_reviewed: data.last_reviewed
      ? typeof data.last_reviewed === 'string'
        ? data.last_reviewed
        : data.last_reviewed.toISOString()
      : null,
  }));

export const FlashcardProgressUpdateSchema = z
  .object({
    easiness_factor: z.number().min(1.3),
    interval: z.number().min(0),
    repetitions: z.number().min(0),
    due_date: z.string().datetime(),
    last_reviewed: z.string().datetime().nullable(),
  })
  .strict();

export type FlashcardProgressUpdate = z.infer<typeof FlashcardProgressUpdateSchema>;

export enum ReviewQuality {
  BlackOut = 0,
  Wrong = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
  Perfect = 5,
}

export interface FlashcardWithProgress extends FlashcardProgress {
  flashcard: {
    id: string;
    question: string;
    answer: string;
    // ... autres propriétés de la flashcard
  };
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
