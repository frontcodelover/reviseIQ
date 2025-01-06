import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/services/backend/auth';
import UserDecks from './UserDecks';
import CreateDeckForm from '@/components/createDeckForm';
import Layout from './dashboard/Layout';

function Dashboard() {
  const [refreshUserDecks, setRefreshUserDecks] = useState(false);
  const navigate = useNavigate();

  const handleDeckCreated = () => {
    setRefreshUserDecks(!refreshUserDecks);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
        <CreateDeckForm onDeckCreated={handleDeckCreated} />
        <UserDecks key={refreshUserDecks.toString()} />
      </div>
    </Layout>
  );
}

export default Dashboard;
