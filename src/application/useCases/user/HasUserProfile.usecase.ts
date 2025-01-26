import { UserRepository } from '@/domain/repositories/UserRepository';

export class HasUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<boolean> {
    return this.userRepository.hasUserProfile(userId);
  }
}
