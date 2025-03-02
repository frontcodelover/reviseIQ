import { Badge } from './Badge';

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
