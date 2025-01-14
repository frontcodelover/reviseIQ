import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';
import GetFlashcards from '@/components/flashcards/getFlashcards';
import { useAuth } from '@/context/AuthContext';

function SingleFolder({ id }: { id: string | undefined }) {
  const [folder, setFolder] = useState<Deck>();
  const { user } = useAuth();
  const user_id = user ? user.id : null;

  useEffect(() => {
    if (!id || !user_id) {
      console.error('ID or User ID is missing');
      return;
    }

    const fetchFolder = async () => {
      try {
        const backend = getBackend();
        await Promise.all([
          backend.logAction(user_id, 'folder_viewed', 1),
          backend.getFolderById(id).then(setFolder),
        ]);
      } catch (error) {
        console.error('Erreur lors de la récupération du dossier :', error);
      }
    };

    fetchFolder();
  }, [id, user_id]);

  return (
    <div className="flex flex-col">
      {folder && (
        <div className="flex flex-col gap-2">
          <div className="w-fit rounded-md text-sm">
            <span className="text-gray-800">Thématique : {folder.thema}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{folder.name}</h2>
            <p className="text-lg text-gray-800">{folder.description}</p>
          </div>
        </div>
      )}

      <div className="flex h-full flex-col py-4">
        <GetFlashcards />
      </div>
    </div>
  );
}

export default SingleFolder;
