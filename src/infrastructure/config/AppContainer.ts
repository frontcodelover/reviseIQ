import { AuthService } from '@/domain/services/AuthService';
import { FlashcardService } from '@/domain/services/FlashcardService';
import { FolderService } from '@/domain/services/FolderService';
import { UserService } from '@/domain/services/UserService';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

class AppContainer {
  private authRepository: SupabaseAuthRepository;
  private flashcardRepository: SupabaseFlashCardRepository;
  private folderRepository: SupabaseFolderRepository;
  private userRepository: SupabaseUserRepository;

  private authService: AuthService;
  private userService: UserService;
  private flashcardService: FlashcardService;
  private folderService: FolderService;

  constructor() {
    this.authRepository = new SupabaseAuthRepository();
    this.flashcardRepository = new SupabaseFlashCardRepository();
    this.folderRepository = new SupabaseFolderRepository();
    this.userRepository = new SupabaseUserRepository();

    this.authService = new AuthService(this.authRepository);
    this.userService = new UserService(this.userRepository);
    this.flashcardService = new FlashcardService(this.flashcardRepository);
    this.folderService = new FolderService(this.folderRepository);
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  getUserService(): UserService {
    return this.userService;
  }

  getFlashcardService(): FlashcardService {
    return this.flashcardService;
  }

  getFolderService(): FolderService {
    return this.folderService;
  }
}

const appContainer = new AppContainer();

export { appContainer };
