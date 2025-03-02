// src/infrastructure/backend/SupabaseFlashcardProgressRepository.ts
import { FlashcardProgress, FlashcardProgressUpdate } from '@/domain/entities/FlashcardProgress';
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

  async updateFlashcardProgress(progress: FlashcardProgressUpdate): Promise<void> {
    if (!progress.id) {
      throw new Error('ID de progression manquant');
    }

    const { error } = await supabase
      .from('flashcard_progress')
      .update({
        easiness_factor: progress.easiness_factor,
        interval: progress.interval,
        repetitions: progress.repetitions,
        due_date: progress.due_date.toISOString(),
        last_reviewed: progress.last_reviewed ? progress.last_reviewed.toISOString() : null,
      })
      .eq('id', progress.id);

    if (error) {
      throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
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
    const now = new Date();

    const newProgress = {
      flashcard_id,
      user_id,
      easiness_factor: 2.5,
      interval: 0,
      repetitions: 0,
      due_date: now.toISOString(),
      last_reviewed: null,
    };

    const { data, error } = await supabase
      .from('flashcard_progress')
      .insert(newProgress)
      .select()
      .single();

    if (error) {
      // Gérer le cas où l'enregistrement existe déjà
      if (error.code === '23505') {
        // Code d'erreur unique constraint
        const existing = await this.getFlashcardProgress(flashcard_id, user_id);
        if (existing) {
          // Conversion des chaînes ISO en objets Date pour respecter le contrat FlashcardProgress
          return {
            ...existing,
            due_date: new Date(existing.due_date),
            last_reviewed: existing.last_reviewed ? new Date(existing.last_reviewed) : null,
            created_at: new Date(existing.created_at),
          };
        }
      }
      throw error;
    }

    // Conversion des chaînes ISO en objets Date pour respecter le contrat FlashcardProgress
    return {
      ...data,
      due_date: new Date(data.due_date),
      last_reviewed: data.last_reviewed ? new Date(data.last_reviewed) : null,
      created_at: new Date(data.created_at),
    };
  }

  async getPriorityFlashcards(user_id: string) {
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
