import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/services/backend/auth';
import UserDecks from './UserDecks';
import CreateDeckForm from '../components/CreateDeckForm';

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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Se déconnecter
        </button>
      </div>
      <CreateDeckForm onDeckCreated={handleDeckCreated} />
      <UserDecks key={refreshUserDecks.toString()} />
    </div>
  );
}

export default Dashboard;
