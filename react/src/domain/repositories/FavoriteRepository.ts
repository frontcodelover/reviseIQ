import { Favorite } from '@/domain/entities/Favorite';

export interface FavoriteRepository {
  addFavorite(user_id: string, deck_id: string): Promise<Favorite>;
  removeFavorite(user_id: string, deck_id: string): Promise<void>;
  getFavoritesByUser(user_id: string): Promise<Favorite[]>;
}
