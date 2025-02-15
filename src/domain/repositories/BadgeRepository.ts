import { Badge, BadgeData } from '@/domain/entities/Badge';

export interface BadgeRepository {
  checkAndUnlockBadges(
    userId: string,
    stats: { flashcards_viewed: number; folders_viewed: number }
  ): Promise<void>;
  getUserBadges(userId: string): Promise<Badge[]>;
  fetchUnreadBadges(userId: string): Promise<BadgeData[]>;
  subsribeToBadgeChanges(userId: string, callback: (badgeData: BadgeData) => void): void;
  unsubsribeFromBadgeChanges(userId: string): void;
  markBadgesAsRead(userId: string, badgeIds: string[]): Promise<void>;
}
