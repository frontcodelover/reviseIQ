import { z } from 'zod';

export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  user_id: z.string(),
  lang: z.enum(['fr', 'en']),
  thema: z.string().nullable(),
  created_at: z.string(),
  flashcardsCount: z.number(),
  author: z
    .object({
      firstname: z.string(),
    })
    .nullable(),
});

export type Folder = z.infer<typeof FolderSchema>;
