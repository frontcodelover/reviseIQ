import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';
import { Folder } from '@/domain/entities/Folder';

export class SupabaseUserRepository implements UserRepository {
  async getUserId(): Promise<string> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error('Utilisateur non trouvé');
    }

    return user.id;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async refreshSession(): Promise<void> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (!session || error) {
      await supabase.auth.refreshSession();
    }
  }

  private MAX_RETRIES = 3;
  private DELAY_MS = 1000;

  private async checkSession(): Promise<boolean> {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return !!session;
  }

  async getUser(): Promise<User> {
    let retryCount = 0;

    while (retryCount < this.MAX_RETRIES) {
      try {
        await this.refreshSession();

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error('Erreur getUser:', error);
          if (retryCount === this.MAX_RETRIES - 1) {
            throw error;
          }
          await this.delay(this.DELAY_MS);
          retryCount++;
          continue;
        }

        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }

        return user as User;
      } catch (error) {
        if (retryCount === this.MAX_RETRIES - 1) {
          throw error;
        }
        await this.delay(this.DELAY_MS);
        retryCount++;
      }
    }

    throw new Error("Impossible de récupérer l'utilisateur");
  }

  async hasUserProfile(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Erreur vérification profil:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Erreur inattendue:', error);
      return false;
    }
  }
  // Fetch user-specific decks
  async getUserDecks(): Promise<Folder[]> {
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
  async createDeck(deckData: Folder): Promise<{ id: string }> {
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
  async upsertProfile(profile: User): Promise<void> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Session non trouvée');
      }

      const { error } = await supabase.from('profiles').upsert({
        user_id: session.user.id, // Utiliser l'ID de l'utilisateur authentifié
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        phone: profile.phone || null,
        status: profile.status || 'student',
        avatar: profile.avatar || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur dans upsertProfile:', error);
      throw error;
    }
  }

  async upsertUser(userData: User): Promise<void> {
    try {
      const { error } = await supabase.from('users').upsert(
        {
          id: userData.id,
          email: userData.email,
          created_at: userData.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id',
        }
      );

      if (error) {
        console.error("Erreur lors de l'upsert utilisateur:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erreur inattendue lors de l'upsert utilisateur:", error);
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
