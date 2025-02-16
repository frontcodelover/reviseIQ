import { appContainer } from '@/infrastructure/config/AppContainer';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { Pagination } from '../../ui/Pagination';
import HeadingTwo from '../../ui/text/heading/HeadingTwo';
import CommunityTable from './CommunityTable';
import { useGetAllPublicFolderStore } from './store/GetAllPublicFolderStore';

export function GetAllPublicFolders() {
  const { page, setPage, limit, setLimit } = useGetAllPublicFolderStore();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['decks', page, limit], async () => {
    const result = await appContainer
      .getFolderService()
      .getPublicFolders(page * limit, (page + 1) * limit - 1);
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
