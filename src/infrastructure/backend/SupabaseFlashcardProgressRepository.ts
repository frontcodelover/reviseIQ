// src/infrastructure/backend/SupabaseFlashcardProgressRepository.ts
import { FlashcardProgress } from '@/domain/entities/FlashcardProgress';
import { FlashcardProgressRepository } from '@/domain/repositories/FlashcardProgressRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

export class SupabaseFlashcardProgressRepository implements FlashcardProgressRepository {
  async getFlashcardProgress(
    flashcard_id: string,
    user_id: string
  ): Promise<FlashcardProgress | null> {
    const { data, error } = await supabase
      .from('flashcard_progress')
      .select('*')
      .eq('flashcard_id', flashcard_id)
      .eq('user_id', user_id)
      .maybeSingle(); // Utiliser maybeSingle() au lieu de single()

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateFlashcardProgress(progress: FlashcardProgress): Promise<void> {
    // Validation des données requises
    if (!progress.id || !progress.user_id || !progress.flashcard_id) {
      throw new Error('Données de progression invalides : id, user_id et flashcard_id sont requis');
    }

    try {
      const { error } = await supabase
        .from('flashcard_progress')
        .update({
          easiness_factor: progress.easiness_factor,
          interval: progress.interval,
          repetitions: progress.repetitions,
          due_date: progress.due_date,
          last_reviewed: progress.last_reviewed,
        })
        .match({
          id: progress.id,
          user_id: progress.user_id,
          flashcard_id: progress.flashcard_id,
        });

      if (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  }

  async getDueFlashcards(user_id: string): Promise<FlashcardProgress[]> {
    const { data, error } = await supabase
      .from('flashcard_progress')
      .select('*')
      .eq('user_id', user_id)
      .lte('due_date', new Date().toISOString());

    if (error) throw error;
    return data || [];
  }

  async createFlashcardProgress(flashcard_id: string, user_id: string): Promise<FlashcardProgress> {
    const { data, error } = await supabase
      .from('flashcard_progress')
      .insert({
        flashcard_id,
        user_id,
        easiness_factor: 2.5,
        interval: 0,
        repetitions: 0,
        due_date: new Date().toISOString(), // Convertir en ISO string
        last_reviewed: null,
      })
      .select()
      .single();

    if (error) {
      // Gérer le cas où l'enregistrement existe déjà
      if (error.code === '23505') {
        // Code d'erreur unique constraint
        const existing = await this.getFlashcardProgress(flashcard_id, user_id);
        if (existing) return existing;
      }
      throw error;
    }
    return data;
  }

  async getPriorityFlashcards(user_id: string): Promise<FlashcardProgress[]> {
    const { data, error } = await supabase
      .from('flashcard_progress')
      .select(
        `
        *,
        flashcard:flashcards(*)
      `
      )
      .eq('user_id', user_id)
      .or('easiness_factor.lte.2.0,repetitions.eq.0')
      .order('easiness_factor', { ascending: true })
      .order('last_reviewed', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des cartes prioritaires:', error);
      throw error;
    }

    return (
      data?.map((progress) => ({
        ...progress,
        flashcard: progress.flashcard,
      })) || []
    );
  }
}
