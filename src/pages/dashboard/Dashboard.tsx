import { useProfile } from '@/hooks/useProfile';

function Dashboard() {
	const { profile, loading, error } = useProfile();
	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur: {error}</div>;
	if (!profile) return null;
  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
			  <h1 className="text-3xl font-bold">Bienvenue {profile.firstname}</h1>
      </div>
      {/* Le reste du contenu du tableau de bord */}
    </div>
  );
}

export default Dashboard;