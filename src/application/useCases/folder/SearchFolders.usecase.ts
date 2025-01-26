import { FolderRepository } from '@/domain/repositories/FolderRepository';
import { Folder } from '@/domain/entities/Folder';

export class SearchFoldersUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(query: string): Promise<Folder[]> {
    return this.folderRepository.searchFolders(query);
  }
}
