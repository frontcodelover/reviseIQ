import { Folder } from '@/domain/entities/Folder';
import { FolderRepository } from '@/domain/repositories/FolderRepository';

export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  getFolderById(folderId: string): Promise<Folder> {
    return this.folderRepository.getFolderById(folderId);
  }
}
