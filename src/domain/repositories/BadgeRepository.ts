import { Badge } from '@/domain/entities/Badge';

export interface BadgeRepository {
  checkAndUnlockBadges(
    userId: string,
    stats: { flashcards_viewed: number; folders_viewed: number }
  ): Promise<void>;
  getUserBadges(userId: string): Promise<Badge[]>;
}
