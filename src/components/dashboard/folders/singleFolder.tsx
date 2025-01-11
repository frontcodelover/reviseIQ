import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';
import GetFlashcards from '@/components/flashcards/getFlashcards';

function SingleFolder({ id }: { id: string | undefined }) {
  const [folder, setFolder] = useState<Deck>();

  useEffect(() => {
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
  }, [id]);

  return (
    <div className="flex flex-col">
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

      <div className="flex h-full flex-col py-4">
        <GetFlashcards />
      </div>
    </div>
  );
}

export default SingleFolder;
