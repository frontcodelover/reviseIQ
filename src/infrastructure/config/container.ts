import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';

class AppContainer {
  private userRepository: SupabaseUserRepository;
  private createFolder: CreateFolder;

  constructor() {
    this.userRepository = new SupabaseUserRepository();
    this.createFolder = new CreateFolder(this.userRepository);
  }

  CreateFolder(): CreateFolder {
    return this.createFolder;
  }
}

const appContainer = new AppContainer();

export { appContainer };
