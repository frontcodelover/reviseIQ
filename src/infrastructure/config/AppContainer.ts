import { AuthService } from '@/domain/services/AuthService';
import { AvatarService } from '@/domain/services/AvatarService';
import { BadgeService } from '@/domain/services/BadgeService';
import { FlashcardService } from '@/domain/services/FlashcardService';
import { FolderService } from '@/domain/services/FolderService';
import { LogService } from '@/domain/services/LogService';
import { UserService } from '@/domain/services/UserService';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SupabaseBadgeRepository } from '@/infrastructure/backend/SupabaseBadgeRepository';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { SupabaseLogRepository } from '@/infrastructure/backend/SupabaseLogRepository';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

import { SupabaseAvatarRepository } from '../backend/SupabaseAvatarRepository';

class AppContainer {
  private authRepository: SupabaseAuthRepository;
  private flashcardRepository: SupabaseFlashCardRepository;
  private folderRepository: SupabaseFolderRepository;
  private userRepository: SupabaseUserRepository;
  private logRepository: SupabaseLogRepository;
  private badgeRepository: SupabaseBadgeRepository;
  private avatarRepository: SupabaseAvatarRepository;

  private authService: AuthService;
  private userService: UserService;
  private flashcardService: FlashcardService;
  private folderService: FolderService;
  private logService: LogService;
  private badgeService: BadgeService;
  private avatarService: AvatarService;

  constructor() {
    this.authRepository = new SupabaseAuthRepository();
    this.flashcardRepository = new SupabaseFlashCardRepository();
    this.folderRepository = new SupabaseFolderRepository();
    this.userRepository = new SupabaseUserRepository();
    this.logRepository = new SupabaseLogRepository();
    this.badgeRepository = new SupabaseBadgeRepository();
    this.avatarRepository = new SupabaseAvatarRepository();

    this.authService = new AuthService(this.authRepository);
    this.userService = new UserService(this.userRepository);
    this.flashcardService = new FlashcardService(this.flashcardRepository);
    this.folderService = new FolderService(this.folderRepository);
    this.logService = new LogService(this.logRepository);
    this.badgeService = new BadgeService(this.badgeRepository);
    this.avatarService = new AvatarService(this.avatarRepository);
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

  getBadgeService(): BadgeService {
    return this.badgeService;
  }

  getAvatarService(): AvatarService {
    return this.avatarService;
  }
}

const appContainer = new AppContainer();

export { appContainer };
