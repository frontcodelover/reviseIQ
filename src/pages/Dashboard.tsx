import { useState } from 'react';

import UserDecks from './UserDecks';
import CreateDeckForm from '../components/CreateDeckForm';

function Dashboard() {
  const [refreshUserDecks, setRefreshUserDecks] = useState(false);

  const handleDeckCreated = () => {
    setRefreshUserDecks(!refreshUserDecks); // Force le rafraîchissement des decks utilisateur
  };

  return (
    <div>
      <h1>Tableau de Bord</h1>
      <CreateDeckForm onDeckCreated={handleDeckCreated} />
      <UserDecks key={refreshUserDecks.toString()} />
    </div>
  );
}

export default Dashboard;
