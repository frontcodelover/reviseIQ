import { supabase } from '../supabaseClient';

export class SupabaseBackend implements Backend {
  // Private method to fetch the authenticated user's ID
  private async getUserId(): Promise<string> {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('Error fetching user session:', sessionError);
      throw new Error('User not authenticated');
    }

    return session.user.id;
  }

  async hasUserProfile(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (error) {
        return false;
      }

      return !!data;
    } catch {
      return false;
    }
  }

  // Fetch public decks
  async getPublicDecks(): Promise<Deck[]> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('is_public', true);

      if (error) {
        console.error('Error fetching public decks:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPublicDecks:', error);
      throw error;
    }
  }

  // Fetch user-specific decks
  async getUserDecks(): Promise<Deck[]> {
    try {
      const userId = await this.getUserId();

      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user decks:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserDecks:', error);
      throw error;
    }
  }

  // Create a new deck
  async createDeck(deckData: {
    title: string;
    description: string;
    is_public: boolean;
  }): Promise<void> {
    try {
      const userId = await this.getUserId();

      const { error } = await supabase.from('decks').insert({
        user_id: userId,
        ...deckData,
      });

      if (error) {
        console.error('Error creating deck:', error);
        throw error;
      }

      console.log('Deck created successfully');
    } catch (error) {
      console.error('Error in createDeck:', error);
      throw error;
    }
  }

  // create flashcards table "flashcards" field id, deck_id, question, answer, created_at
  async createFlashcard(flashcardData: Flashcard): Promise<void> {
    try {
      const { error } = await supabase
        .from('flashcards')
        .insert([flashcardData]);

      if (error) {
        console.error('Error creating flashcard:', error);
        throw error;
      }

      console.log('Flashcard created successfully');
    } catch (error) {
      console.error('Error in createFlashcard:', error);
      throw error;
    }
  }

  // Fetch flashcards by deck ID
  async getFlashcards(deckId: string): Promise<Flashcard[]> {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('deck_id', deckId);

      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getFlashcards:', error);
      throw error;
    }
  }

  // Upsert a user's profile in the "users" table
  async upsertUser(userData: User): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert([userData], {
          onConflict: 'email', // Update if the email already exists
        });

      if (error) {
        console.error('Error upserting user:', error);
        throw error;
      }

      console.log('User updated successfully:', data);
    } catch (error) {
      console.error('Error in upsertUser:', error);
      throw error;
    }
  }

  // Fetch the authenticated user's profile
  async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as User;
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      return null;
    }
  }

  // Fetch folder name by ID
  async getFolderById(folderId: string): Promise<CardFolderProps> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('id', folderId)
        .single();

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
      const { error } = await supabase
        .from('decks')
        .delete()
        .eq('id', folderId);
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
}
