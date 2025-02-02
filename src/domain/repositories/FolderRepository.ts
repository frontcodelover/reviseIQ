import { Folder } from '@/domain/entities/Folder';

export interface FolderRepository {
  getPublicFolders(start: number, end: number): Promise<{ data: Folder[]; count: number }>;
  getLastPublicFolders(): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder>;
  deleteFolder(id: string): Promise<void>;
  searchFolders(query: string): Promise<Folder[]>;
  isFolderOwner(id: string, user_id: string): Promise<boolean>;
}
