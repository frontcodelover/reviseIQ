import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { useTranslation } from 'react-i18next';
import { Folder } from '@/domain/entities/Folder';
import { formatDate } from '@/lib/FormatDate';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

const CardFolder = ({ ...props }: Folder) => {
  const { id, name, thema, lang, user_id, created_at } = props;
  const { profile, isLoading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: '100%',
        boxShadow: 'sm',
      }}
    >
      <CardContent>
        <Typography level="h2" fontSize="lg" fontWeight="lg">
          <Link to={`/dashboard/folders/${id}`}>{name}</Link>
        </Typography>
        <Typography level="h3" color="secondary" fontSize="sm">
          {thema}
        </Typography>
      </CardContent>
      {!isLoading && profile && (
        <CardActions
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar src={profile.avatar} alt="avatar user" />
            <Box>
              <Typography level="h4" fontSize="sm" color="secondary">
                {t('dashboard.folder.by')} {profile?.firstname}
              </Typography>
              <Typography fontSize={12}> {created_at ? formatDate(created_at) : ''}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography fontSize={14} fontWeight={600}>
              {t('language')}:
            </Typography>
            <Typography fontSize={14} fontWeight="bold">
              {lang.toUpperCase()}
            </Typography>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default CardFolder;
