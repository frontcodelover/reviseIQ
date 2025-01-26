import { UserRepository } from '@/domain/repositories/UserRepository';
import { Folder } from '@/domain/entities/Folder';

export class CreateFolder {
  constructor(private userRepository: UserRepository) {}

  async execute(folderData: Folder): Promise<{ id: string }> {
    return this.userRepository.createDeck(folderData);
  }
}
