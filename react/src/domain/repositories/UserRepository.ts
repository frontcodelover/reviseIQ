import { Folder } from '@/domain/entities/Folder';
import { User } from '@/domain/entities/User';

export interface UserRepository {
  getUser(): Promise<User>;
  getUserId(): Promise<string>;
  hasUserProfile(userId: string): Promise<boolean>;
  getUserFolders(): Promise<Folder[]>;
  createDeck(deckData: Folder): Promise<{ id: string }>;
  upsertUser(userData: User): Promise<void>;
  upsertProfile(user: User): Promise<void>;
  getUserProfile(userId: string): Promise<User | null>;
}
