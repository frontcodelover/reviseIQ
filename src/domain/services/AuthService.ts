import { User } from '@/domain/entities/User';
import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  signInWithEmail(email: string, password: string): Promise<User> {
    return this.authRepository.signInWithEmail(email, password);
  }
  signInWithProvider(provider: 'google'): Promise<void> {
    return this.authRepository.signInWithProvider(provider);
  }
  signUp(email: string, password: string): Promise<User> {
    return this.authRepository.signUp(email, password);
  }
  signOut(): Promise<void> {
    return this.authRepository.signOut();
  }

  resetPassword(email: string): Promise<void> {
    return this.authRepository.resetPassword(email);
  }

  updateUserPassword(newPassword: string) {
    return this.authRepository.updateUserPassword(newPassword);
  }
}
