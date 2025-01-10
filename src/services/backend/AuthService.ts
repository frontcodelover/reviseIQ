import { supabase } from '@/services/supabaseClient';

export class AuthService {
  // Inscription par email
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erreur inattendue lors de l'inscription :", error);
      throw error;
    }
  }

  // Connexion par email
  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Erreur inattendue lors de la connexion :', error);
      throw error;
    }
  }

  // Connexion avec un provider OAuth
  async signInWithProvider(provider: 'google') {
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

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw error;
    }
  }

  // Récupérer l'utilisateur connecté
  async getUser() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(
        'Erreur lors de la récupération de la session utilisateur :',
        error
      );
      throw error;
    }
    return data?.session?.user || null;
  }
}
