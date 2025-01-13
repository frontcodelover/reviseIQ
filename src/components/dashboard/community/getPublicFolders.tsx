import { getBackend } from '@/services/backend';
import { useQuery } from 'react-query';
import CardFolder from '../folders/cardFolder';

export function GetPublicFolders() {
  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Deck[]>('publicFolders', () =>
    getBackend().getLastPublicFolders()
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!folders) return <div>Aucun dossier public trouvé</div>;

  return (
		<div className="flex flex-col gap-4">
		  <h2 className="text-xl font-semibold">
			Les derniers dossiers de la communauté
		  </h2>
		  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{folders.map((folder) => (
			  <CardFolder key={folder.id} {...folder} />
			))}
		  </div>
		</div>
	  );
}
