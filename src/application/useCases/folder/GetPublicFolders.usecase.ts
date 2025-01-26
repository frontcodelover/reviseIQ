import { FolderRepository } from '@/domain/repositories/FolderRepository';
import { Folder } from '@/domain/entities/Folder';

export class GetPublicFoldersUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(): Promise<Folder[]> {
    return this.folderRepository.getPublicFolders();
  }
}
