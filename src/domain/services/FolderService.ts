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

  getLastPublicFolders(): Promise<Folder[]> {
    return this.folderRepository.getLastPublicFolders();
  }

  getRandomPublicFolders(): Promise<Folder[]> {
    return this.folderRepository.getRandomPublicFolders();
  }

  isOwner(folderId: string, userId: string): Promise<boolean> {
    return this.folderRepository.isFolderOwner(folderId, userId);
  }

  deleteFolder(folderId: string): Promise<void> {
    return this.folderRepository.deleteFolder(folderId);
  }

  addVoteFolder(folderId: string, userId: string, vote: 1 | -1): Promise<void> {
    return this.folderRepository.addVoteFolder(folderId, userId, vote);
  }

  removeVoteFolder(folderId: string, userId: string): Promise<void> {
    return this.folderRepository.removeVoteFolder(folderId, userId);
  }

  getUserVote(folderId: string, userId: string): Promise<number | null> {
    return this.folderRepository.getUserVote(folderId, userId);
  }

  getMostLikedFolders(): Promise<Folder[]> {
    return this.folderRepository.getMostLikedFolders();
  }
}
