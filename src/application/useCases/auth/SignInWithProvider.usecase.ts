import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class SignInWithProviderUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(provider: 'google'): Promise<void> {
    return this.authRepository.signInWithProvider(provider);
  }
}
