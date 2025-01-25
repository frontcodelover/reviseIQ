import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { FolderRepository } from '@/domain/repositories/FolderRepository';
import { Folder, CardFolderProps } from '@/domain/entities/Folder';

export class SupabaseFolderRepository implements FolderRepository {
  async getPublicFolders(): Promise<Folder[]> {
    try {
      const { data, error } = await supabase.from('decks').select('*').eq('is_public', true);

      if (error) {
        console.error('Error fetching getPublicFolders:', error);
        throw error;
      }

      return data || [];
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
        .limit(6);

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

  // Delete a folder by ID
  async deleteFolder(folderId: string): Promise<void> {
    try {
      const { error } = await supabase.from('decks').delete().eq('id', folderId);
      if (error) {
        console.error('Error deleting folder:', error);
        throw error;
      }
      console.log('Folder deleted successfully');
    } catch (error) {
      console.error('Error in deleteFolder:', error);
      throw error;
    }
  }
  async searchFolders(search: string): Promise<Folder[]> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .textSearch('name', search)
        .eq('is_public', true);

      if (error) {
        console.error('Error fetching searchFolders:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchFolders:', error);
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
}
