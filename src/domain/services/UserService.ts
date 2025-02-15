import { Folder } from '@/domain/entities/Folder';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createFolder(folderData: Folder): Promise<{ id: string }> {
    return this.userRepository.createDeck(folderData);
  }

  getUserId(): Promise<string> {
    return this.userRepository.getUserId();
  }

  getUserFolders(): Promise<Folder[]> {
    return this.userRepository.getUserFolders();
  }

  upsertUser(user: User): Promise<void> {
    return this.userRepository.upsertUser(user);
  }

  upsertProfile(user: User): Promise<void> {
    return this.userRepository.upsertProfile(user);
  }

  getUserProfile(userId: string): Promise<User | null> {
    return this.userRepository.getUserProfile(userId);
  }
}
