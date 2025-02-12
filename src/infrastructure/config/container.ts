import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SignInWithEmailUseCase } from '@/application/useCases/auth/SignInWithEmail.usecase';

class AppContainer {
  private userRepository: SupabaseUserRepository;
  private createFolder: CreateFolder;
  private signInWithEmail: SignInWithEmailUseCase;
  private authRepository: SupabaseAuthRepository;

  constructor() {
    this.userRepository = new SupabaseUserRepository();
    this.createFolder = new CreateFolder(this.userRepository);
    this.authRepository = new SupabaseAuthRepository();
    this.signInWithEmail = new SignInWithEmailUseCase(this.authRepository);
  }

  CreateFolder(): CreateFolder {
    return this.createFolder;
  }

  SignInWithEmail(): SignInWithEmailUseCase {
    return this.signInWithEmail;
  }
}

const appContainer = new AppContainer();

export { appContainer };
