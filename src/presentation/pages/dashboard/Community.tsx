import { useTranslation } from 'react-i18next';
import { GetAllPublicFolders } from '@/presentation/components/dashboard/community/GetAllPublicFolder';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
function Community() {
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
        {t('dashboard.community')}
      </Typography>
      <GetAllPublicFolders />
    </Box>
  );
}
export default Community;
