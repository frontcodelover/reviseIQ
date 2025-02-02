import { FolderRepository } from '@/domain/repositories/FolderRepository';

export class GetPublicFoldersUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async execute(start: number, end: number) {
    const result = await this.folderRepository.getPublicFolders(start, end);
    return {
      data: result.data,
      count: result.count,
    };
  }
}
