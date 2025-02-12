import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SignInWithEmailUseCase } from '@/application/useCases/auth/SignInWithEmail.usecase';
import { SignInWithProviderUseCase } from '@/application/useCases/auth/SignInWithProvider.usecase';

class AppContainer {
  private userRepository: SupabaseUserRepository;
  private createFolder: CreateFolder;
  private signInWithEmail: SignInWithEmailUseCase;
  private authRepository: SupabaseAuthRepository;
  private signInWithProvider: SignInWithProviderUseCase;

  constructor() {
    this.userRepository = new SupabaseUserRepository();
    this.createFolder = new CreateFolder(this.userRepository);
    this.authRepository = new SupabaseAuthRepository();
    this.signInWithEmail = new SignInWithEmailUseCase(this.authRepository);
    this.signInWithProvider = new SignInWithProviderUseCase(this.authRepository);
  }

  CreateFolder(): CreateFolder {
    return this.createFolder;
  }

  SignInWithEmail(): SignInWithEmailUseCase {
    return this.signInWithEmail;
  }

  SignInWithProvider(): SignInWithProviderUseCase {
    return this.signInWithProvider;
  }
}

const appContainer = new AppContainer();

export { appContainer };
