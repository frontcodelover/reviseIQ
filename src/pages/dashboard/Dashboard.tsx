import { useState, useEffect } from "react";
import { GetPublicFolders } from "@/components/dashboard/community/getPublicFolders";
import { useProfile } from "@/hooks/useProfile";
import { getBackend } from "@/services/backend";
import { useAuth } from "@/context/AuthContext";
import ActivityCalendar from "@/components/dashboard/stats/activityCalendar";

function Dashboard() {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();
  const userId = user ? user.id : null;

  const [logs, setLogs] = useState<Record<string, number>>({}); // Stocker les logs

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) {
        console.error("Erreur: userId est null");
        return;
      }

      try {
        const backend = getBackend();
        const dailyLogs = await backend.getUsageLogsByDay(userId);

        // Formater les données pour les afficher dans le calendrier
        const formattedLogs: Record<string, number> = {};
        Object.entries(dailyLogs).forEach(([date, actions]) => {
          formattedLogs[date] = Object.values(actions).reduce(
            (sum, count) => sum + count,
            0
          );
        });

		  setLogs(formattedLogs);
		  console.log(formattedLogs);
      } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error);
      }
    };

    fetchLogs();
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

      {/* Ajouter l'ActivityCalendar */}
      <div className="mt-8">
        <ActivityCalendar data={logs} />
      </div>
    </div>
  );
}

export default Dashboard;
