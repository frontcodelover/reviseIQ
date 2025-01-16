import { useEffect, useState } from 'react';
import { GetUserBadgesUseCase } from '@/application/useCases/GetUserBadges.usecase';
import { SupabaseBadgeRepository } from '@/infrasctructure/backend/SupabaseBadgeRepository';
import { CheckAndUnlockBadgesUseCase } from '@/application/useCases/CheckAndUnlockBadges.usecase';
import { GetUsageLogsByDay } from '@/application/useCases/GetUsageLogsByDay.usecase';
import { SupabaseLogRepository } from '@/infrasctructure/backend/SupabaseLogRepository';

export const LogsAndBadgesManager: React.FC<LogsAndBadgesManagerProps> = ({
  userId,
  onLogsUpdate,
  onBadgesUpdate,
  onLastBadgeUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const badgeRepository = new SupabaseBadgeRepository();
  const logRepository = new SupabaseLogRepository();
  const getUserBadgesUseCase = new GetUserBadgesUseCase(badgeRepository);
  const checkAndUnlockBadgesUseCase = new CheckAndUnlockBadgesUseCase(badgeRepository);
  const getUsageLogsByDay = new GetUsageLogsByDay(logRepository);

  useEffect(() => {
    const fetchLogsAndBadges = async () => {
      if (!userId) return;
      setIsLoading(true);
      setError(null);

      try {
        // Récupérer les logs
        const dailyLogs: Record<string, DailyActions> = await getUsageLogsByDay.execute(userId);
        const formattedLogs: Record<string, number> = {};

        Object.entries(dailyLogs).forEach(([date, actions]) => {
          formattedLogs[date] = Object.values(actions).reduce(
            (sum: number, count) => sum + (count || 0),
            0
          );
        });
        onLogsUpdate(formattedLogs);

        // Calcul des totaux pour les badges
        let flashcards_viewed = 0;
        let folders_viewed = 0;
        Object.values(dailyLogs).forEach((actions) => {
          flashcards_viewed += actions.flashcard_reviewed || 0;
          folders_viewed += actions.folder_viewed || 0;
        });

        // Vérifier et débloquer les badges
        await checkAndUnlockBadgesUseCase.execute(userId, {
          flashcards_viewed,
          folders_viewed,
        });

        // Récupérer les badges débloqués
        const userBadges = await getUserBadgesUseCase.execute(userId);
        onBadgesUpdate(userBadges);

        const sortedBadges = [...userBadges].sort(
          (a: Badge, b: Badge) =>
            new Date(b.obtained_at).getTime() - new Date(a.obtained_at).getTime()
        );
        if (onLastBadgeUpdate && sortedBadges.length > 0) {
          onLastBadgeUpdate(sortedBadges[0]);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
        setError(errorMessage);
        console.error('Erreur lors de la récupération des logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogsAndBadges();
  }, [userId, onLogsUpdate, onBadgesUpdate, onLastBadgeUpdate]);

  if (isLoading) {
    return <div className="text-center">Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>;
  }

  return null;
};

export default LogsAndBadgesManager;
