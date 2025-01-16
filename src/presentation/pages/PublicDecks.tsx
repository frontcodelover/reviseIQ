import { useEffect, useState } from 'react';

import { Folder } from '@/domain/entities/Folder';

import { SupabaseFolderRepository } from '@/infrasctructure/backend/SupabaseFolderRespository';
import { GetPublicFoldersUseCase } from '@/application/useCases/GetPublicFolders.usecase';

const folderRepository = new SupabaseFolderRepository();
const getPublicFoldersUseCase = new GetPublicFoldersUseCase(folderRepository);

function PublicDecks() {
  const [decks, setDecks] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicDecks = async () => {
      console.log('fetchPublicDecks');
      try {
       
        const data = await getPublicFoldersUseCase.execute();
        setDecks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des decks publics :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDecks();
  }, []);

  if (loading) return <p>Chargement des decks publics...</p>;

  return (
    <div>
      <h1>Decks Publics</h1>
      {decks.length === 0 ? (
        <p>Aucun deck public disponible.</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PublicDecks;
