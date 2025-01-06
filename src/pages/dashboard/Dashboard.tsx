import { useState } from 'react';
import UserDecks from '../UserDecks';
import CreateDeckForm from '@/components/createDeckForm';

function Dashboard() {
  const [refreshUserDecks, setRefreshUserDecks] = useState(false);

  const handleDeckCreated = () => {
    setRefreshUserDecks(!refreshUserDecks);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
      </div>
      <CreateDeckForm onDeckCreated={handleDeckCreated} />
      <UserDecks key={refreshUserDecks.toString()} />
    </div>
  );
}

export default Dashboard;
