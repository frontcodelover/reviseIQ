import { useQuery } from 'react-query';
import { Folder } from '@/domain/entities/Folder';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetPublicFoldersUseCase } from '@/application/useCases/folder/GetPublicFolders.usecase';

const folderRepository = new SupabaseFolderRepository();
const getPublicFoldersUseCase = new GetPublicFoldersUseCase(folderRepository);

function PublicDecks() {
  const {
    data: decks,
    isLoading,
    error,
  } = useQuery<Folder[], Error>('publicDecks', () => getPublicFoldersUseCase.execute());
  console.log('PUBLIC DECKS');

  if (isLoading) return <p>Chargement des decks publics...</p>;
  if (error) return <p>Erreur lors de la récupération des decks publics.</p>;

  return (
    <div>
      <h1>Decks Publics</h1>
      {decks?.length === 0 ? (
        <p>Aucun deck public disponible.</p>
      ) : (
        <ul>
          {decks?.map((deck) => (
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
