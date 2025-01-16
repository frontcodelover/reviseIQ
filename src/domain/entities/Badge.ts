export interface BadgeData {
  unlocked_at: string;
  badges: {
    id: string;
    name: string;
    description: string;
    image_url: string;
  };
}

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
