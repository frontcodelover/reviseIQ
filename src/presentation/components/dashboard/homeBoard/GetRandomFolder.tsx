import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import { useQuery } from 'react-query';

import RandomCard from '../folders/RandomCard';

export default function GetRandomFolder() {
  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('randomPublicFolder', () =>
    appContainer.getFolderService().getRandomPublicFolders()
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!folders) return <div>Aucun dossier public trouvé</div>;

  return (
    <Sheet
      sx={{
        display: 'flex',
        gap: 1.5,
        backgroundColor: 'var(--joy-palette-background)', // Utiliser backgroundColor au lieu de bgcolor
        height: '100%',
      }}
    >
      <Card
        sx={{
          bgcolor: 'var(--joy-palette-primary-solidActiveBg)', // Utiliser solidBg au lieu de solidActiveBg
          flex: 1,
          display: 'flex',
          gap: 3,
          alignItems: 'start',
          flexDirection: 'column',
          justifyContent: 'start',
          textAlign: 'left',
          padding: 4, // Ajouter du padding
          color: 'white', // Texte en blanc pour meilleur contraste
        }}
        variant="solid" // Changer le variant pour une meilleure cohérence
      >
        <Box>
          <Typography level="h2" sx={{ color: 'inherit' }}>
            La dossier du jour ⭐
          </Typography>
          <Typography sx={{ color: 'inherit' }}>
            Chaque jour nous mettons en avant un dossier public aléatoire pour vous inspirer et
            apprendre de nouvelles choses.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: 'auto',
          }}
        >
          {folders.map((folder) => (
            <RandomCard {...folder} key={folder.id} />
          ))}
        </Box>
      </Card>
    </Sheet>
  );
}
