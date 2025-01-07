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
        .eq('user_id', userId);

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
  async createDeck(deckData: { title: string; description: string; is_public: boolean }): Promise<void> {
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

  // Upsert a user's profile in the "users" table
  async upsertUser(userData: {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    status: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
  }): Promise<void> {
    try {
      const { data, error } = await supabase.from('users').upsert([userData], {
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
  async getUserProfile(): Promise<User> {
    try {
      const userId = await this.getUserId();

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      throw error;
    }
  }

  // Fetch folder name by ID
  async getFolderById(folderId: string): Promise<{ name: string }> {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('name')
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
}