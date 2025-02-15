import { z } from 'zod';

export const BadgeDataSchema = z.object({
  unlocked_at: z.string(),
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  obtained_at: z.string().optional(),
  badges: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
  }),
});

export type BadgeData = z.infer<typeof BadgeDataSchema>;

export interface Badge {
  id: string;
  name: string;
  description: string;
  image_url: string;
  obtained_at: string;
  unlockedAt?: Date;
}

export interface DailyActions {
  flashcard_reviewed?: number;
  folder_viewed?: number;
  [key: string]: number | undefined;
}

export interface LogsAndBadgesManagerProps {
  userId: string | null;
  onLogsUpdate: (logs: Record<string, number>) => void;
  onBadgesUpdate: (badges: Badge[]) => void;
  onLastBadgeUpdate?: (badge: Badge | null) => void;
}
