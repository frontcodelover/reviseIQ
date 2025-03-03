import { AuthService } from '@/domain/services/AuthService';
import { AvatarService } from '@/domain/services/AvatarService';
import { BadgeService } from '@/domain/services/BadgeService';
import { FavoriteService } from '@/domain/services/FavoriteService';
import { FlashcardService } from '@/domain/services/FlashcardService';
import { FolderService } from '@/domain/services/FolderService';
import { LogService } from '@/domain/services/LogService';
import { SpacedRepetitionService } from '@/domain/services/SpacedRepetitionService';
import { UserService } from '@/domain/services/UserService';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SupabaseAvatarRepository } from '@/infrastructure/backend/SupabaseAvatarRepository';
import { SupabaseBadgeRepository } from '@/infrastructure/backend/SupabaseBadgeRepository';
import { SupabaseFavoriteRepository } from '@/infrastructure/backend/SupabaseFavoriteRepository';
import { SupabaseFlashcardProgressRepository } from '@/infrastructure/backend/SupabaseFlashcardProgressRepository';
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
  private badgeRepository: SupabaseBadgeRepository;
  private avatarRepository: SupabaseAvatarRepository;
  private flashcardProgressRepository: SupabaseFlashcardProgressRepository;
  private favoriteRepository: SupabaseFavoriteRepository;

  private authService: AuthService;
  private userService: UserService;
  private flashcardService: FlashcardService;
  private folderService: FolderService;
  private logService: LogService;
  private badgeService: BadgeService;
  private avatarService: AvatarService;
  private spacedRepetitionService: SpacedRepetitionService;
  private favoriteService: FavoriteService;

  constructor() {
    // Initialisation des repositories
    this.authRepository = new SupabaseAuthRepository();
    this.flashcardRepository = new SupabaseFlashCardRepository();
    this.folderRepository = new SupabaseFolderRepository();
    this.userRepository = new SupabaseUserRepository();
    this.logRepository = new SupabaseLogRepository();
    this.badgeRepository = new SupabaseBadgeRepository();
    this.avatarRepository = new SupabaseAvatarRepository();
    this.flashcardProgressRepository = new SupabaseFlashcardProgressRepository();
    this.favoriteRepository = new SupabaseFavoriteRepository();

    // Initialisation des services
    this.authService = new AuthService(this.authRepository);
    this.userService = new UserService(this.userRepository);
    this.flashcardService = new FlashcardService(this.flashcardRepository);
    this.folderService = new FolderService(this.folderRepository);
    this.logService = new LogService(this.logRepository);
    this.badgeService = new BadgeService(this.badgeRepository);
    this.avatarService = new AvatarService(this.avatarRepository);
    this.spacedRepetitionService = new SpacedRepetitionService();
    this.favoriteService = new FavoriteService(this.favoriteRepository);
  }

  // Services existants
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

  getSpacedRepetitionService(): SpacedRepetitionService {
    return this.spacedRepetitionService;
  }

  getFlashcardProgressRepository(): SupabaseFlashcardProgressRepository {
    return this.flashcardProgressRepository;
  }

  getFavoriteService(): FavoriteService {
    return this.favoriteService;
  }
}

const appContainer = new AppContainer();

export { appContainer };
