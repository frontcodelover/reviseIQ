import { useState } from 'react';
import { getBackend } from '@/services/backend';
import CreateFlashcard from '@/components/flashcards/createFlashcard';
import { useNavigate } from 'react-router-dom';
import GetFlashcards from '@/components/flashcards/getFlashcards';

function SingleFolder({ id }: { id: string | undefined }) {
  const [folder, setFolder] = useState<Deck>();
  const navigate = useNavigate();

  const fetchFolder = async () => {
    try {
      const backend = getBackend();
      if (id) {
        const folder = await backend.getFolderById(id);
        setFolder(folder);
      } else {
        console.error('ID is undefined');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du dossier :', error);
    }
  };

  fetchFolder();

  const handleFlashcardsCreated = () => {
    // Action après création réussie
    navigate('/dashboard/folders');
    // ou afficher une notification
    // ou rafraîchir les données
  };

  return (
    <>
      <div>singleFolder</div>
      <GetFlashcards />
      {folder && (
        <div>
          <h2>{folder.name}</h2>
          <p>{folder.description}</p>
        </div>
      )}
      <CreateFlashcard onSuccess={handleFlashcardsCreated} />
    </>
  );
}

export default SingleFolder;
