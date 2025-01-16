import { supabase } from '@/infrasctructure/backend/SupabaseClient';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

export class SupabaseUserRepository implements UserRepository {
  async getUser(): Promise<User> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Erreur lors de la récupération de la session utilisateur :', error);
      throw error;
    }

    if (!data?.session?.user) {
      throw new Error('User not found');
    }

    return data.session.user as unknown as User;
  }
  async getUserId(): Promise<string> {
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
  async createDeck(deckData: Deck): Promise<{ id: string }> {
    try {
      const userId = await this.getUserId();

      const { data, error } = await supabase
        .from('decks')
        .insert({
          user_id: userId,
          ...deckData,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating deck:', error);
        throw error;
      }

      console.log('Deck created successfully with id:', data.id);
      return { id: data.id };
    } catch (error) {
      console.error('Error in createDeck:', error);
      throw error;
    }
  }

  // Upsert a user's profile in the "users" table
  async upsertUser(userData: User): Promise<void> {
    try {
      const { data, error } = await supabase.from('profiles').upsert([userData], {
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
}
