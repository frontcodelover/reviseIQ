import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { User } from '@/domain/entities/User';

export class SupabaseAuthRepository implements AuthRepository {
  // Authentication methods
  async signUp(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
    }

    return {
      id: data.user?.id || '',
      email: data.user?.email || '',
    };
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      }
      return {
        id: data.user?.id || '',
        email: data.user?.email || '',
      };
    } catch (error) {
      console.error('Erreur inattendue lors de la connexion :', error);
      throw error;
    }
  }

  async signInWithProvider(provider: 'google'): Promise<void> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        console.error('Erreur lors de la connexion OAuth :', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur inattendue lors de la connexion OAuth :', error);
      throw error;
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      throw error;
    }
  }

/**
   * Updates the user's password in the Supabase authentication system.
   * @param newPassword - The new password to set for the user.
   * @returns Promise<void> - Resolves if the password update is successful.
   * @throws Error - Throws an error if the password update fails.
   */
  async updateUserPassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      throw error;
    }
  }
}
