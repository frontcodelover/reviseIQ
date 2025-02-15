import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import { useTranslation } from 'react-i18next';

function Folders() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        margin: '1rem 0',
        gap: '1.5rem',
      }}
    >
      <Typography level="h1" noWrap fontWeight={600}>
        {t('dashboard.folder.yourfolder')}
      </Typography>

      <UserDecks />
    </Box>
  );
}

export default Folders;
