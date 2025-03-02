import { Badge, BadgeData } from '@/domain/entities/Badge';
import { BadgeRepository } from '@/domain/repositories/BadgeRepository';

export class BadgeService {
  constructor(private badgeRepository: BadgeRepository) {}

  async getUserBadges(userId: string): Promise<Badge[]> {
    return this.badgeRepository.getUserBadges(userId);
  }

  checkAndUnlockBadges(
    userId: string,
    { flashcards_viewed, folders_viewed }: { flashcards_viewed: number; folders_viewed: number }
  ): Promise<void> {
    return this.badgeRepository.checkAndUnlockBadges(userId, { flashcards_viewed, folders_viewed });
  }

  async fetchUnreadBadges(userId: string): Promise<BadgeData[]> {
    return this.badgeRepository.fetchUnreadBadges(userId);
  }

  subsribeToBadgeChanges(userId: string, callback: (badgeData: BadgeData) => void): void {
    this.badgeRepository.subsribeToBadgeChanges(userId, callback);
  }

  unsubsribeFromBadgeChanges(userId: string): void {
    this.badgeRepository.unsubsribeFromBadgeChanges(userId);
  }

  async markBadgesAsRead(userId: string, badgeId: string[]): Promise<void> {
    return this.badgeRepository.markBadgesAsRead(userId, badgeId);
  }
}
