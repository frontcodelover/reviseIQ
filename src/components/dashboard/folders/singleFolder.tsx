import { useState } from 'react';
import { getBackend } from '@/services/backend';

function SingleFolder({ id }: { id: string | undefined }) {
  const [folder, setFolder] = useState<Deck>();

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

  return (
    <>
      <div>singleFolder</div>
      {folder && (
        <div>
          <h2>{folder.name}</h2>
          <p>{folder.description}</p>
        </div>
      )}
    </>
  );
}

export default SingleFolder;
