import { useState } from 'react';
import CreateDeckForm from '@/components/createDeckForm';
import UserDecks from '@/pages/UserDecks';

function Folders() {
  const [refreshUserDecks, setRefreshUserDecks] = useState(false);

  const handleDeckCreated = () => {
    setRefreshUserDecks(!refreshUserDecks);
  };
  return (
    <>
      <UserDecks key={refreshUserDecks.toString()} />
      <CreateDeckForm onDeckCreated={handleDeckCreated} />
    </>
  );
}

export default Folders;
