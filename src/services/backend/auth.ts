import { supabase } from '@/services/supabaseClient';

// Inscription par email
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error during sign up:', error);
    throw error;
  }
};

// Connexion par email
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error during sign in:', error);
    throw error;
  }
};

// Connexion avec un provider OAuth
export async function signInWithProvider(provider: 'google') {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error('Error during OAuth sign in:', error);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error during OAuth sign in:', error);
    throw error;
  }
}

// Déconnexion
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

// Récupérer l'utilisateur connecté
export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting user session:', error);
    throw error;
  }
  return data?.session?.user || null;
};
