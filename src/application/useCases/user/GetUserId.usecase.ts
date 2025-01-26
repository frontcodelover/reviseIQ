import { UserRepository } from '@/domain/repositories/UserRepository';

export class GetUserIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<string> {
    return this.userRepository.getUserId();
  }
}
