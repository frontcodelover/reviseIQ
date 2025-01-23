import { User } from '@/domain/entities/User';
import { Folder } from '@/domain/entities/Folder';

export interface UserRepository {
  getUser(): Promise<User>;
  getUserId(): Promise<string>;
  hasUserProfile(userId: string): Promise<boolean>;
  getUserDecks(): Promise<Folder[]>;
  createDeck(deckData: Folder): Promise<{ id: string }>;
  upsertUser(userData: User): Promise<void>;
  upsertProfile(user: User): Promise<void>;
  getUserProfile(userId: string): Promise<User | null>;
}
