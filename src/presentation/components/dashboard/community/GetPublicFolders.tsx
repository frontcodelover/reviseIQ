import { useQuery } from 'react-query';
import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetLastPublicFolderUseCase } from '@/application/useCases/folder/GetLastPublicFolder.usecase';
import { Folder } from '@/domain/entities/Folder';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

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
    <Container>
      <Grid>
        {folders.map((folder) => (
          <CardFolder key={folder.id} {...folder} />
        ))}
      </Grid>
    </Container>
  );
}
