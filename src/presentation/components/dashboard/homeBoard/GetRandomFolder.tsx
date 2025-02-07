import styled from 'styled-components';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { useQuery } from 'react-query';
import { GetRandomFolderUseCase } from '@/application/useCases/folder/GetRandomFolder.usecase';
import { Folder } from '@/domain/entities/Folder';
import CardFolder from '../folders/CardFolder';
import Card from '@mui/joy/Card';
import { Typography } from '@mui/joy';

export default function GetRandomFolder() {
  const folderRepository = new SupabaseFolderRepository();
  const getRandomFolderUseCase = new GetRandomFolderUseCase(folderRepository);

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('randomPublicFolder', () => getRandomFolderUseCase.execute());

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!folders) return <div>Aucun dossier public trouvé</div>;

  return (
    <Card
      orientation="horizontal"
      sx={(theme) => ({
        alignItems: 'center',
        [theme.getColorSchemeSelector('light')]: {
          backgroundColor: 'darkBlue.softColor',
        },
        [theme.getColorSchemeSelector('dark')]: {
          backgroundColor: 'darkBlue.solidBg',
          borderColor: 'darkBlue.outlinedBorder',
        },
      })}
      variant="outlined"
    >
      <ContainerTitle>
        <Typography level="h2">La dossier du jour ⭐</Typography>
        <Typography>
          Chaque jour nous mettons en avant un dossier public aléatoire pour vous inspirer et
          apprendre de nouvelles choses.
        </Typography>
      </ContainerTitle>
      {folders.map((folder) => (
        <Card
          key={folder.id}
          sx={{
            flex: 1,
            border: 'none',
            padding: 0,
            display: 'block',
            backgroundColor: 'transparent',
          }}
        >
          <CardFolder {...folder} />
        </Card>
      ))}
    </Card>
  );
}

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  flex: 1;
  padding: 1.5rem;
`;
