import { GetLastPublicFolderUseCase } from '@/application/useCases/folder/GetLastPublicFolder.usecase';
import { Folder } from '@/domain/entities/Folder';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import CardFolder from '@/presentation/components/dashboard/folders/CardFolder';
import { Box, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Grid>
        {folders.map((folder) => (
          <CardFolder key={folder.id} {...folder} />
        ))}
      </Grid>
      <Typography
        sx={{
          color: 'var(--joy-palette-primary-solidBg)',
          textAlign: 'right',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        <Link to="/dashboard/community">+ {t('dashboard.folder.moreFolder')}</Link>
      </Typography>
    </Box>
  );
}

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
