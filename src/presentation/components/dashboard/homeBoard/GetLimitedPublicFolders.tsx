import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetLastPublicFolderUseCase } from '@/application/useCases/folder/GetLastPublicFolder.usecase';

import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';
import { Folder } from '@/domain/entities/Folder';
import Text from '@/presentation/components/ui/text/Text';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

export function GetLimitedPublicFolders() {
  const folderRepository = new SupabaseFolderRepository();
  const getLastPublicFolderUseCase = new GetLastPublicFolderUseCase(folderRepository);
  const { t } = useTranslation();

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('lastPublicFolders', () => getLastPublicFolderUseCase.execute());

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
      <LinkText>
        <Link to="/dashboard/community">+ {t('dashboard.folder.moreFolder')}</Link>
      </LinkText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 1rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const LinkText = styled(Text)`
  width: fit-content;
  a {
    color: ${COLORS.primary};
    text-decoration: none;
  }

  &:hover a {
    text-decoration: underline;
  }
`;
