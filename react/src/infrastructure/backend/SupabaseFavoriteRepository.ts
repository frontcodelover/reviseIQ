import { Favorite } from '@/domain/entities/Favorite';
import { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

/**
 * Implementation of FavoriteRepository using Supabase
 * Manages favorites between users and folders/decks
 */
export class SupabaseFavoriteRepository implements FavoriteRepository {
  async addFavorite(user_id: string, deck_id: string): Promise<Favorite> {
    // Note: We map folder_id to deck_id for database consistency
    const favorite = {
      user_id: user_id,
      deck_id: deck_id, // Using deck_id as this is the column name in the database
    };

    const { data, error } = await supabase
      .from('deck_follows')
      .insert(favorite)
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        // Code for unique constraint violation
        throw new Error('Ce dossier est déjà dans vos favoris');
      }
      throw new Error(`Erreur lors de l'ajout aux favoris: ${error.message}`);
    }

    // Map the response back to the expected interface
    return {
      id: data.id,
      user_id: data.user_id,
      deck_id: data.deck_id, // Map deck_id back to folder_id for the domain layer
      created_at: data.created_at,
    };
  }

  async removeFavorite(user_id: string, deck_id: string): Promise<void> {
    const { error } = await supabase
      .from('deck_follows')
      .delete()
      .match({ user_id: user_id, deck_id: deck_id }); // Using deck_id here

    if (error) {
      throw new Error(`Erreur lors de la suppression du favori: ${error.message}`);
    }
  }

  async getFavoritesByUser(user_id: string): Promise<Favorite[]> {
    const { data, error } = await supabase.from('deck_follows').select('*').eq('user_id', user_id);

    if (error) {
      throw new Error(`Erreur lors de la récupération des favoris: ${error.message}`);
    }

    // Map the database column names to the domain model
    return (data || []).map((item) => ({
      id: item.id,
      user_id: item.user_id,
      deck_id: item.deck_id, // Map deck_id to folder_id
      created_at: item.created_at,
    }));
  }

  async isFavorite(user_id: string, deck_id: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('deck_follows')
      .select('id')
      .eq('user_id', user_id)
      .eq('deck_id', deck_id) // Using deck_id here
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means "No rows found"
      throw new Error(`Erreur lors de la vérification du favori: ${error.message}`);
    }

    return !!data;
  }

  async getFolderFollowersCount(deck_id: string): Promise<number> {
    const { count, error } = await supabase
      .from('deck_follows')
      .select('*', { count: 'exact', head: true })
      .eq('deck_id', deck_id); // Using deck_id here
    if (error) {
      throw new Error(`Erreur lors du comptage des favoris: ${error.message}`);
    }

    return count || 0;
  }
}
