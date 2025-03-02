import { Favorite } from '@/domain/entities/Favorite';
import { SupabaseFavoriteRepository } from '@/infrastructure/backend/SupabaseFavoriteRepository';

export class FavoriteService {
  constructor(private favoriteRepository: SupabaseFavoriteRepository) {}

  async getUserFavorites(user_id: string): Promise<Favorite[]> {
    return this.favoriteRepository.getFavoritesByUser(user_id);
  }

  async isFolderFavorite(user_id: string, deck_id: string): Promise<boolean> {
    return this.favoriteRepository.isFavorite(user_id, deck_id);
  }

  async addFavorite(user_id: string, deck_id: string): Promise<void> {
    // Vérifier si le favori existe déjà
    const exists = await this.isFolderFavorite(user_id, deck_id);
    if (exists) return;

    // Ajouter le favori
    await this.favoriteRepository.addFavorite(user_id, deck_id);

    // La partie notification sera implémentée plus tard
  }

  async removeFavorite(user_id: string, deck_id: string): Promise<void> {
    await this.favoriteRepository.removeFavorite(user_id, deck_id);
  }

  async getFolderFollowersCount(deck_id: string): Promise<number> {
    return this.favoriteRepository.getFolderFollowersCount(deck_id);
  }
}
