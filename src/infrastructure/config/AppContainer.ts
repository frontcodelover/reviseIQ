import { AuthService } from '@/domain/services/AuthService';
import { FlashcardService } from '@/domain/services/FlashcardService';
import { FolderService } from '@/domain/services/FolderService';
import { LogService } from '@/domain/services/LogService';
import { UserService } from '@/domain/services/UserService';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { SupabaseLogRepository } from '@/infrastructure/backend/SupabaseLogRepository';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

class AppContainer {
  private authRepository: SupabaseAuthRepository;
  private flashcardRepository: SupabaseFlashCardRepository;
  private folderRepository: SupabaseFolderRepository;
  private userRepository: SupabaseUserRepository;
  private logRepository: SupabaseLogRepository;

  private authService: AuthService;
  private userService: UserService;
  private flashcardService: FlashcardService;
  private folderService: FolderService;
  private logService: LogService;

  constructor() {
    this.authRepository = new SupabaseAuthRepository();
    this.flashcardRepository = new SupabaseFlashCardRepository();
    this.folderRepository = new SupabaseFolderRepository();
    this.userRepository = new SupabaseUserRepository();
    this.logRepository = new SupabaseLogRepository();

    this.authService = new AuthService(this.authRepository);
    this.userService = new UserService(this.userRepository);
    this.flashcardService = new FlashcardService(this.flashcardRepository);
    this.folderService = new FolderService(this.folderRepository);
    this.logService = new LogService(this.logRepository);
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

  getLogService(): LogService {
    return this.logService;
  }
}

const appContainer = new AppContainer();

export { appContainer };
