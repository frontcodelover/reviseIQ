import { useState } from 'react';
import { useQuery } from 'react-query';
// import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetPublicFoldersUseCase } from '@/application/useCases/folder/GetPublicFolders.usecase';
import { Pagination } from '../../ui/Pagination';

import styled from 'styled-components';
import CommunityTable from './CommunityTable';
import HeadingTwo from '../../ui/text/heading/HeadingTwo';

export function GetAllPublicFolders() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(19);

  const folderRepository = new SupabaseFolderRepository();
  const getPublicFoldersUseCase = new GetPublicFoldersUseCase(folderRepository);

  // Modifiez useQuery pour inclure les paramètres de pagination
  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['decks', page, limit], async () => {
    const result = await getPublicFoldersUseCase.execute(page * limit, (page + 1) * limit - 1);
    return result;
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!response?.data) return <div>Aucun dossier public trouvé</div>;

  return (
    <Container>
      <HeadingTwo $align="right" $weight="medium">
        {response.count} dossiers publics
      </HeadingTwo>
      <CommunityTable folders={response.data} />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
