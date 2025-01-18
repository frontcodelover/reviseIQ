import { Folder } from '@/domain/entities/Folder';

export interface FolderRepository {
  getPublicFolders(): Promise<Folder[]>;
  getLastPublicFolders(): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder>;
  deleteFolder(id: string): Promise<void>;
  searchFolders(query: string): Promise<Folder[]>;
}
