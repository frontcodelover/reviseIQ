import { z } from 'zod';

export const FirstTimeFormSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  phone: z.string().optional(), // Adjust validation as needed
  status: z.enum(['student', 'pupil', 'apprentice', 'teacher', 'other']),
  avatar: z.string().nullable().optional(),
});

export type FirstTimeFormData = z.infer<typeof FirstTimeFormSchema>;
