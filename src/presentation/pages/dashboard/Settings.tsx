import Profile from '@/presentation/components/dashboard/profile/Profile';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

export default function Settings() {
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
        {t('dashboard.profile')}
      </Typography>

      <Profile />
    </Box>
  );
}
