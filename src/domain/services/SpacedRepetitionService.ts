// src/domain/services/SpacedRepetitionService.ts
import { ReviewQuality } from '@/domain/entities/FlashcardProgress';

export interface FlashcardProgress {
  id: string;
  flashcard_id: string;
  user_id: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  due_date: Date;
  last_reviewed: Date | null;
  created_at: Date;
}

export interface FlashcardProgressUpdate {
  id: string;
  flashcard_id: string;
  user_id: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  due_date: Date;
  last_reviewed: Date | null;
}

export class SpacedRepetitionService {
  private static readonly MIN_EASE_FACTOR = 1.3;
  private static readonly INITIAL_EASE_FACTOR = 2.5;
  private static readonly EASE_FACTOR_DECREASE = 0.15;
  private static readonly EASE_FACTOR_INCREASE = 0.15;
  private static readonly HARD_INTERVAL_MODIFIER = 0.5;

  private static readonly INTERVALS = {
    FIRST: 1, // 1 jour
    SECOND: 6, // 6 jours
    WRONG: 1, // 1 jour
    HOURS_4: 4, // 4 heures
  };

  static calculateNextReview(
    progress: FlashcardProgress,
    quality: ReviewQuality
  ): Partial<FlashcardProgress> {
    const now = new Date();
    const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    // Gérer les réponses incorrectes
    if (quality <= ReviewQuality.Wrong) {
      return {
        easiness_factor: Math.max(
          this.MIN_EASE_FACTOR,
          progress.easiness_factor - this.EASE_FACTOR_DECREASE
        ),
        interval: 1,
        repetitions: 0,
        due_date: fourHoursLater,
        last_reviewed: now,
      };
    }

    // Calculer le nouveau facteur de facilité
    let efModifier = 0;
    if (quality === ReviewQuality.Perfect) {
      efModifier = this.EASE_FACTOR_INCREASE;
    } else if (quality === ReviewQuality.Easy) {
      efModifier = this.EASE_FACTOR_INCREASE / 2;
    } else if (quality === ReviewQuality.Hard) {
      efModifier = -this.EASE_FACTOR_DECREASE / 2;
    }

    const newEF = Math.max(this.MIN_EASE_FACTOR, progress.easiness_factor + efModifier);

    // Calculer le nouvel intervalle
    let newInterval: number;
    if (progress.repetitions === 0) {
      newInterval = this.INTERVALS.FIRST;
    } else if (progress.repetitions === 1) {
      newInterval = this.INTERVALS.SECOND;
    } else {
      newInterval = Math.round(progress.interval * newEF);
    }

    // Ajuster l'intervalle pour les réponses difficiles
    if (quality === ReviewQuality.Hard) {
      newInterval = Math.max(1, Math.round(newInterval * this.HARD_INTERVAL_MODIFIER));
    }

    return {
      easiness_factor: Number(newEF.toFixed(2)),
      interval: newInterval,
      repetitions: progress.repetitions + 1,
      due_date: this.addDays(now, newInterval),
      last_reviewed: now,
    };
  }

  private static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + Math.max(1, Math.ceil(days)));
    return newDate;
  }
}
