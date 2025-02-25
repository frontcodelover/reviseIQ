import { CardFolderProps, Folder } from '@/domain/entities/Folder';
import { FolderRepository } from '@/domain/repositories/FolderRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

export class SupabaseFolderRepository implements FolderRepository {
  async getPublicFolders(start: number, end: number): Promise<{ data: Folder[]; count: number }> {
    try {
      const { data, count, error } = await supabase
        .from('decks')
        .select('*', { count: 'exact' })
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) {
        console.error('Error fetching getPublicFolders:', error);
        throw error;
      }

      return { data: data || [], count: count || 0 };
    } catch (error) {
      console.error('Error in getPublicFolders:', error);
      throw error;
    }
  }

  // get Last 6 public decks
  async getLastPublicFolders(): Promise<Folder[]> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error fetching getLastPublicFolders:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getLastPublicFolders:', error);
      throw error;
    }
  }

  // Fetch folder name by ID
  async getFolderById(folderId: string): Promise<CardFolderProps> {
    try {
      const { data, error } = await supabase.from('decks').select('*').eq('id', folderId).single();

      if (error) {
        console.error('Error fetching folder name:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getFolderById:', error);
      throw error;
    }
  }

  private readonly RANDOM_FOLDER_CACHE_KEY = 'random-folder-cache';
  private readonly CACHE_DURATION = 86400000; // 24 hours

  async getRandomPublicFolders(): Promise<Folder[]> {
    try {
      const cachedData = localStorage.getItem(this.RANDOM_FOLDER_CACHE_KEY);
      if (cachedData) {
        const { folder, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp < this.CACHE_DURATION) {
          return [folder];
        }
      }

      // Si pas de cache valide, faire la requête
      const { count } = await supabase
        .from('decks')
        .select('*', { count: 'exact', head: true })
        .eq('is_public', true);

      if (!count) return [];

      const randomOffset = Math.floor(Math.random() * count);
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('is_public', true)
        .range(randomOffset, randomOffset)
        .limit(1);

      if (error) throw error;

      // Mettre en cache
      if (data && data.length > 0) {
        localStorage.setItem(
          this.RANDOM_FOLDER_CACHE_KEY,
          JSON.stringify({
            folder: data[0],
            timestamp: Date.now(),
          })
        );
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRandomPublicFolders:', error);
      throw error;
    }
  }
  // Delete a folder by ID
  async deleteFolder(folderId: string): Promise<void> {
    try {
      const { error } = await supabase.from('decks').delete().eq('id', folderId);
      if (error) {
        console.error('Error deleting folder:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteFolder:', error);
      throw error;
    }
  }
  async isFolderOwner(folderId: string, user_id: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('user_id')
        .eq('id', folderId)
        .single();

      if (error) {
        console.error('Error fetching isFolderOwner:', error);
        throw error;
      }

      return data?.user_id === user_id;
    } catch (error) {
      console.error('Error in isFolderOwner:', error);
      throw error;
    }
  }

  async addVoteFolder(folderId: string, user_id: string, vote: 1 | -1): Promise<void> {
    try {
      const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('deck_id', folderId)
        .eq('user_id', user_id)
        .single();

      if (existingVote) {
        throw new Error('Vous avez déjà voté pour ce dossier');
      }

      const { error } = await supabase.from('votes').insert([
        {
          deck_id: folderId,
          user_id: user_id,
          vote: vote,
        },
      ]);

      if (error) {
        console.error('Error adding vote:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in addVoteFolder:', error);
      throw error;
    }
  }

  async removeVoteFolder(folderId: string, user_id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .eq('deck_id', folderId)
        .eq('user_id', user_id);

      if (error) {
        console.error('Error removing vote:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in removeVoteFolder:', error);
      throw error;
    }
  }

  async getUserVote(folderId: string, user_id: string): Promise<number | null> {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('vote')
        .eq('deck_id', folderId)
        .eq('user_id', user_id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }

      return data?.vote || null;
    } catch (error) {
      console.error('Error in getUserVote:', error);
      throw error;
    }
  }
}
