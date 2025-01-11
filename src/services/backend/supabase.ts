import { AuthService } from '@/services/backend/AuthService';
import { UserService } from '@/services/backend/UserService';
import { FolderService } from '@/services/backend/FolderService';
import { FlashcardService } from '@/services/backend/FlashCardService';

export class SupabaseBackend implements BackendType {
  private authService: AuthService;
  private userService: UserService;
  private folderService: FolderService;
  private flashcardService: FlashcardService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.folderService = new FolderService();
    this.flashcardService = new FlashcardService();
  }

  // Authentication Services
  public async signUp(email: string, password: string) {
    return this.authService.signUp(email, password);
  }
  public async signInWithEmail(email: string, password: string) {
    return this.authService.signInWithEmail(email, password);
  }
  public async signInWithProvider(provider: 'google') {
    return this.authService.signInWithProvider(provider);
  }
  public async signOut() {
    return this.authService.signOut();
  }
  public async getUser() {
    return this.authService.getUser();
  }
  public async getUserId() {
    return this.userService.getUserId();
  }
  public async hasUserProfile(userId: string) {
    return this.userService.hasUserProfile(userId);
  }

  // User Services
  public async getUserDecks() {
    return this.userService.getUserDecks();
  }
  public async createDeck(deckData: Deck): Promise<{ id: string }> {
    return this.userService.createDeck(deckData);
  }
  public async upsertUser(userData: User) {
    return this.userService.upsertUser(userData);
  }
  public async getUserProfile(userId: string) {
    return this.userService.getUserProfile(userId);
  }

  // Folder Services
  public async getPublicFolders() {
    return this.folderService.getPublicFolders();
  }

  public async getLastPublicFolders() {
    return this.folderService.getLastPublicFolders();
  }

  public async getFolderById(id: string) {
    return this.folderService.getFolderById(id);
  }

  public async deleteFolder(id: string) {
    return this.folderService.deleteFolder(id);
  }

  // Flashcard Services
  public async createFlashcard(flashcardData: Flashcard) {
    return this.flashcardService.createFlashcard(flashcardData);
  }

  public async getFlashcards(deckId: string) {
    return this.flashcardService.getFlashcards(deckId);
  }

  public async generateFlashcards(topic: string) {
    return this.flashcardService.generateFlashcards(topic);
  }
}
