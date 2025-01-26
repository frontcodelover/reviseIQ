import { BadgeRepository } from '@/domain/repositories/BadgeRepository';
import { Badge } from '@/domain/entities/Badge';

export class GetUserBadgesUseCase {
  constructor(private badgeRepository: BadgeRepository) {}

  async execute(userId: string): Promise<Badge[]> {
    return this.badgeRepository.getUserBadges(userId);
  }
}
