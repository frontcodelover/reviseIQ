import { useQuery } from 'react-query';
import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';

import { SupabaseFolderRepository } from '@/infrasctructure/backend/SupabaseFolderRespository';
import { GetLastPublicFolderUseCase } from '@/application/useCases/GetLastPublicFolder.usecase';
import { Folder } from '@/domain/entities/Folder';

export function GetPublicFolders() {
  const folderRepository = new SupabaseFolderRepository();
  const getLastPublicFolderUseCase = new GetLastPublicFolderUseCase(folderRepository);

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('publicFolders', () => getLastPublicFolderUseCase.execute());

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!folders) return <div>Aucun dossier public trouvé</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Les derniers dossiers de la communauté</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {folders.map((folder) => (
          <CardFolder key={folder.id} {...folder} />
        ))}
      </div>
    </div>
  );
}
