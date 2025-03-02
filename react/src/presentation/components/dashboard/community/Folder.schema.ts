import { z } from 'zod';

// Custom validation for PostgreSQL timestamp format
const pgDateString = z.string().refine(
  (val) => {
    // Accept any non-empty string as a date representation
    // The actual date formatting/parsing will be handled by the UI
    return val && val.length > 0;
  },
  {
    message: 'Invalid date format',
  }
);

export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thema: z.string().nullable(),
  is_public: z.boolean().default(false),
  lang: z.string().default('fr'),
  user_id: z.string(),
  flashcardsCount: z.number(),
  author: z.object({ firstname: z.string() }).nullable(),
  created_at: pgDateString,
});

export type Folder = z.infer<typeof FolderSchema>;
