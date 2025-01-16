import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { User } from '@/domain/entities/User';

export class SignInWithEmailUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    return this.authRepository.signInWithEmail(email, password);
  }
}
