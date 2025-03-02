import { Folder } from '@/domain/entities/Folder';

export interface FolderRepository {
  getPublicFolders(start: number, end: number): Promise<{ data: Folder[]; count: number }>;
  getLastPublicFolders(): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder>;
  deleteFolder(folderId: string): Promise<void>;
  isFolderOwner(id: string, user_id: string): Promise<boolean>;
  getRandomPublicFolders(): Promise<Folder[]>;
  addVoteFolder(folderId: string, user_id: string, vote: 1 | -1): Promise<void>;
  removeVoteFolder(folderId: string, user_id: string): Promise<void>;
  getUserVote(folderId: string, user_id: string): Promise<number | null>;
  getMostLikedFolders(): Promise<Folder[]>;
}
