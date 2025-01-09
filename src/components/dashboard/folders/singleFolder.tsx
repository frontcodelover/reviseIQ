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
    <div className="flex h-screen flex-col">
      {folder && (
        <div className="flex flex-col gap-2">
          <div className="w-fit rounded-md text-sm">
            <span className="text-slate-800">Thématique : {folder.thema}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">{folder.name}</h2>
            <p className="text-lg text-slate-800">{folder.description}</p>
          </div>
        </div>
      )}

      <div className="flex h-full flex-col justify-center">
        <GetFlashcards />
      </div>
      <CreateFlashcard onSuccess={handleFlashcardsCreated} />
    </div>
  );
}

export default SingleFolder;
