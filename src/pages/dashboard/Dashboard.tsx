import { GetPublicFolders } from "@/components/dashboard/community/getPublicFolders";
import { useProfile } from "@/hooks/useProfile";
import { getBackend } from "@/services/backend";
import { useEffect } from "react";

function Dashboard() {
	const { profile, loading, error } = useProfile();
	
	useEffect(() => {
	  const backend = getBackend();

	async function testGetUsageLogsByDay() {
		const userId = "5d74560d-a62b-4e3a-8c51-0635ad4eb7e0"; // Utilise un ID utilisateur valide
	  
		try {
		  const dailyLogs = await backend.getUsageLogsByDay(userId);
		  console.log("Logs récupérés par jour :", dailyLogs);
		} catch (error) {
		  console.error("Erreur lors de la récupération des logs :", error);
		}
	  }
	  
	  testGetUsageLogsByDay();

  }, []);

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
    </div>
  );
}

export default Dashboard;
