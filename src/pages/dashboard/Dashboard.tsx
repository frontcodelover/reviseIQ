import Badge from '@/assets/badge/badge.svg';
import { useState, useEffect } from 'react';
import { GetPublicFolders } from '@/components/dashboard/community/getPublicFolders';
import { useProfile } from '@/hooks/useProfile';
import { getBackend } from '@/services/backend';
import { useAuth } from '@/context/AuthContext';
import ActivityCalendar from '@/components/dashboard/stats/activityCalendar';

function Dashboard() {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();
  const userId = user ? user.id : null;

  const [logs, setLogs] = useState<Record<string, number>>({});

  const [badges, setBadges] = useState<Badge[]>([]);

  // Récupérer les logs et vérifier les badges
  useEffect(() => {
    const fetchLogsAndBadges = async () => {
      if (!userId) return;

      try {
        const backend = getBackend();

        // Récupérer les logs
        const dailyLogs = await backend.getUsageLogsByDay(userId);
        const formattedLogs: Record<string, number> = {};
        Object.entries(dailyLogs).forEach(([date, actions]) => {
          formattedLogs[date] = Object.values(actions).reduce(
            (sum, count) => sum + count,
            0
          );
        });
        setLogs(formattedLogs);

        // Calcul des totaux pour les badges
        let flashcards_viewed = 0;
        let folders_viewed = 0;
        Object.values(dailyLogs).forEach((actions) => {
          flashcards_viewed += actions.flashcard_reviewed || 0;
          folders_viewed += actions.folder_viewed || 0;
        });

        // Vérifier et débloquer les badges
        await backend.checkAndUnlockBadges(userId, {
          flashcards_viewed,
          folders_viewed,
        });

        // Récupérer les badges débloqués
        const userBadges = await backend.getUserBadges(userId);
        setBadges(userBadges);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des logs ou des badges :',
          error
        );
      }
    };

    fetchLogsAndBadges();
  }, [userId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bienvenue {profile.firstname}</h1>
      </div>

      <p>Comment fonctionne ReviseIQ ?</p>
      <GetPublicFolders />
      <p>Les dernières listes de Flashcards de vos amis</p>

      <div className="mt-8">
        <ActivityCalendar data={logs} />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Vos Badges</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="flex flex-col items-center">
              <div>
                <img src={badge.image_url} alt="Badge" className="h-16 w-16" />
              </div>
              <p className="text-sm font-bold">{badge.name}</p>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
