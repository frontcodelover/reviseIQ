import { useState } from 'react';
import { useQuery } from 'react-query';
import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetPublicFoldersUseCase } from '@/application/useCases/folder/GetPublicFolders.usecase';
import { Pagination } from '../../ui/Pagination';

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

export function GetAllPublicFolders() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);

  const folderRepository = new SupabaseFolderRepository();
  const getPublicFoldersUseCase = new GetPublicFoldersUseCase(folderRepository);

  // Modifiez useQuery pour inclure les paramètres de pagination
  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['decks', page, limit], async () => {
    const result = await getPublicFoldersUseCase.execute(page * limit, (page + 1) * limit - 1);
    console.log('Query Response:', result); // Debug log
    return result;
  });

  // Debug logs
  console.log('Full Response:', response);
  console.log('Data:', response?.data);
  console.log('Count:', response?.count);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!response?.data) return <div>Aucun dossier public trouvé</div>;

  return (
    <Container>
      <Grid>
        {response.data.map((folder) => (
          <CardFolder key={folder.id} {...folder} />
        ))}
      </Grid>
      <Pagination
        page={page}
        limit={limit}
        total={response.count}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(0);
        }}
      />
    </Container>
  );
}
