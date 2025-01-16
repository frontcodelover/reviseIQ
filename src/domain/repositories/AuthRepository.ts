import { User } from '@/domain/entities/User';

export interface AuthRepository {
  signUp(email: string, password: string): Promise<User>;
  signInWithEmail(email: string, password: string): Promise<User>;
  signInWithProvider(provider: 'google'): Promise<void>;
  signOut(): Promise<void>;
}
