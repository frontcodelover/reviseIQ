import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';
import { SignInWithEmailUseCase } from '@/application/useCases/auth/SignInWithEmail.usecase';
import { SignInWithProviderUseCase } from '@/application/useCases/auth/SignInWithProvider.usecase';
import { GetPublicFoldersUseCase } from '@/application/useCases/folder/GetPublicFolders.usecase';
import { GetFlashcardsUseCase } from '@/application/useCases/flashcard/GetFlashcards.usecase';
import { CreateFlashcardUseCase } from '@/application/useCases/flashcard/CreateFlashcard.usecase';

class AppContainer {
  private authRepository: SupabaseAuthRepository;
  private flashcardRepository: SupabaseFlashCardRepository;
  private folderRepository: SupabaseFolderRepository;
  private userRepository: SupabaseUserRepository;
  private createFolder: CreateFolder;
  private signInWithEmail: SignInWithEmailUseCase;
  private signInWithProvider: SignInWithProviderUseCase;
  private getPublicFolders: GetPublicFoldersUseCase;
  private getFlashcards: GetFlashcardsUseCase;
  private createFlashcard: CreateFlashcardUseCase;

  constructor() {
    this.authRepository = new SupabaseAuthRepository();
    this.flashcardRepository = new SupabaseFlashCardRepository();
    this.folderRepository = new SupabaseFolderRepository();
    this.userRepository = new SupabaseUserRepository();

    this.createFolder = new CreateFolder(this.userRepository);
    this.signInWithEmail = new SignInWithEmailUseCase(this.authRepository);
    this.signInWithProvider = new SignInWithProviderUseCase(this.authRepository);
    this.getPublicFolders = new GetPublicFoldersUseCase(this.folderRepository);
    this.getFlashcards = new GetFlashcardsUseCase(this.flashcardRepository);
    this.createFlashcard = new CreateFlashcardUseCase(this.flashcardRepository);
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

  GetPublicFolders(): GetPublicFoldersUseCase {
    return this.getPublicFolders;
  }

  GetFlashcards(): GetFlashcardsUseCase {
    return this.getFlashcards;
  }

  CreateFlashcard(): CreateFlashcardUseCase {
    return this.createFlashcard;
  }
}

const appContainer = new AppContainer();

export { appContainer };
