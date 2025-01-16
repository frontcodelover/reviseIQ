import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

export class UpsertUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    return this.userRepository.upsertUser(user);
  }
}
