// src/domain/services/SpacedRepetitionService.ts
import {
  FlashcardProgress,
  FlashcardProgressUpdate,
  ReviewQuality,
} from '@/domain/entities/FlashcardProgress';

export class SpacedRepetitionService {
  static calculateNextReview(
    progress: FlashcardProgress,
    quality: ReviewQuality
  ): FlashcardProgressUpdate {
    // Validation des valeurs d'entrée
    const currentEF = progress.easiness_factor ?? 2.5;
    const currentInterval = progress.interval ?? 0;
    const currentRepetitions = progress.repetitions ?? 0;

    // Calcul du nouveau facteur de facilité
    const newEf = Math.max(1.3, currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    // Calcul de l'intervalle
    let newInterval: number;
    let newRepetitions = currentRepetitions;

    if (quality <= ReviewQuality.Wrong) {
      newInterval = 0;
      newRepetitions = Math.max(0, currentRepetitions - 1);
    } else if (quality === ReviewQuality.Hard) {
      newInterval = Math.max(1, Math.floor(currentInterval * 0.5));
      // Garder le même nombre de répétitions
    } else {
      if (currentInterval === 0) {
        newInterval = 1;
      } else if (currentInterval === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(currentInterval * newEf);
      }
      newRepetitions += 1;
    }

    // Calcul des dates
    const now = new Date();
    const dueDate = new Date();

    if (quality <= ReviewQuality.Wrong) {
      // Pour les réponses incorrectes : révision dans 4 heures
      dueDate.setHours(dueDate.getHours() + 4);
    } else {
      // Pour les autres réponses : révision selon l'intervalle calculé
      dueDate.setDate(dueDate.getDate() + newInterval);
    }

    return {
      easiness_factor: Number(newEf.toFixed(2)), // Arrondir à 2 décimales
      interval: newInterval,
      repetitions: newRepetitions,
      due_date: dueDate.toISOString(),
      last_reviewed: now.toISOString(),
    };
  }
}
