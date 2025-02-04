import { useQuery } from 'react-query';
import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetLastPublicFolderUseCase } from '@/application/useCases/folder/GetLastPublicFolder.usecase';
import { Folder } from '@/domain/entities/Folder';
import styled from 'styled-components';
import Text from '../../ui/text/Text';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  gap: 2rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: minmax(250px, 1fr);
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(250px, 1fr);
    gap: 1rem;
  }
`;

const LinkText = styled(Text)`
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

export function GetPublicFolders() {
  const folderRepository = new SupabaseFolderRepository();
  const getLastPublicFolderUseCase = new GetLastPublicFolderUseCase(folderRepository);
  const { t } = useTranslation();

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
      <LinkText size="regular" color="primary" weight="regular">
        <Link to="/dashboard/community">+ {t('dashboard.folder.moreFolder')}</Link>
      </LinkText>
    </Container>
  );
}
