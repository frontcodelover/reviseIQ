import { Folder } from '@/domain/entities/Folder';
import { FolderRepository } from '@/domain/repositories/FolderRepository';

export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  getFolderById(folderId: string): Promise<Folder> {
    return this.folderRepository.getFolderById(folderId);
  }

  async getPublicFolders(start: number, end: number) {
    const result = await this.folderRepository.getPublicFolders(start, end);
    return {
      data: result.data,
      count: result.count,
    };
  }

  async getLastPublicFolders(): Promise<Folder[]> {
    return this.folderRepository.getLastPublicFolders();
  }
}
