import { Folder } from '@/domain/entities/Folder';
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
}
