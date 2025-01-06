import { supabase } from '../supabaseClient';
import { Backend } from './index';

export class SupabaseBackend implements Backend {
  // Méthode privée pour récupérer l'ID utilisateur connecté
  private async getUserId(): Promise<string> {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error(
        'Erreur lors de la récupération de la session utilisateur :',
        sessionError
      );
      throw new Error('Utilisateur non authentifié');
    }

    return session.user.id;
  }

  // Récupération des decks publics
  async getPublicDecks() {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('is_public', true);

    if (error) {
      console.error(
        'Erreur lors de la récupération des decks publics :',
        error
      );
      throw error;
    }

    return data || [];
  }

  // Récupération des decks utilisateur
  async getUserDecks() {
    try {
      const userId = await this.getUserId();

      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error(
          'Erreur lors de la récupération des decks utilisateur :',
          error
        );
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erreur dans getUserDecks :', error);
      throw error;
    }
  }

  // Création d'un nouveau deck
  async createDeck(deckData: {
    title: string;
    description: string;
    is_public: boolean;
  }) {
    try {
      const userId = await this.getUserId();

      const { error } = await supabase.from('decks').insert({
        user_id: userId, // Automatiquement récupéré
        ...deckData,
      });

      if (error) {
        console.error('Erreur lors de la création du deck :', error);
        throw error;
      }

      console.log('Deck créé avec succès');
    } catch (error) {
      console.error('Erreur dans createDeck :', error);
      throw error;
    }
  }
}
