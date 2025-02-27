import { FlashcardProgress, ReviewQuality } from '@/domain/entities/FlashcardProgress';

import { SpacedRepetitionService } from '../SpacedRepetitionService';

// src/domain/services/SpacedRepetitionService.test.ts

// src/domain/services/SpacedRepetitionService.test.ts
describe('SpacedRepetitionService.calculateNextReview() calculateNextReview method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should calculate the next review for a perfect review quality', () => {
      const progress: FlashcardProgress = {
        id: '1',
        flashcard_id: 'flashcard1',
        user_id: 'user1',
        easiness_factor: 2.5,
        interval: 1,
        repetitions: 1,
        due_date: new Date(),
        last_reviewed: null,
        created_at: new Date(),
      };

      const result = SpacedRepetitionService.calculateNextReview(progress, ReviewQuality.Perfect);

      expect(result.easiness_factor).toBeCloseTo(2.65, 2);
      expect(result.interval).toBe(6);
      expect(result.repetitions).toBe(2);
    });

    it('should calculate the next review for a good review quality', () => {
      const progress: FlashcardProgress = {
        id: '2',
        flashcard_id: 'flashcard2',
        user_id: 'user2',
        easiness_factor: 2.5,
        interval: 6,
        repetitions: 2,
        due_date: new Date(),
        last_reviewed: null,
        created_at: new Date(),
      };

      const result = SpacedRepetitionService.calculateNextReview(progress, ReviewQuality.Good);

      expect(result.easiness_factor).toBeCloseTo(2.5, 2);
      expect(result.interval).toBe(Math.round(6 * 2.5));
      expect(result.repetitions).toBe(3);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle a wrong review quality by resetting repetitions and setting a 4-hour interval', () => {
      const progress: FlashcardProgress = {
        id: '3',
        flashcard_id: 'flashcard3',
        user_id: 'user3',
        easiness_factor: 2.5,
        interval: 10,
        repetitions: 5,
        due_date: new Date(),
        last_reviewed: null,
        created_at: new Date(),
      };

      const result = SpacedRepetitionService.calculateNextReview(progress, ReviewQuality.Wrong);

      expect(result.easiness_factor).toBeCloseTo(2.35, 2);
      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
    });

    it('should handle a hard review quality by adjusting the interval and decreasing the easiness factor', () => {
      const progress: FlashcardProgress = {
        id: '4',
        flashcard_id: 'flashcard4',
        user_id: 'user4',
        easiness_factor: 2.5,
        interval: 10,
        repetitions: 3,
        due_date: new Date(),
        last_reviewed: null,
        created_at: new Date(),
      };

      const result = SpacedRepetitionService.calculateNextReview(progress, ReviewQuality.Hard);

      expect(result.easiness_factor).toBeCloseTo(2.425, 2);
      expect(result.interval).toBe(Math.max(1, Math.round(10 * 2.425 * 0.5)));
      expect(result.repetitions).toBe(4);
    });

    it('should not decrease easiness factor below the minimum', () => {
      const progress: FlashcardProgress = {
        id: '5',
        flashcard_id: 'flashcard5',
        user_id: 'user5',
        easiness_factor: 1.3,
        interval: 10,
        repetitions: 3,
        due_date: new Date(),
        last_reviewed: null,
        created_at: new Date(),
      };

      const result = SpacedRepetitionService.calculateNextReview(progress, ReviewQuality.Wrong);

      expect(result.easiness_factor).toBe(1.3);
      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
    });
  });
});
