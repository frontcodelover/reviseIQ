import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';

import { Folder } from '@/domain/entities/Folder';

import { formatDate } from '@/lib/FormatDate';

import Card from '@mui/joy/Card';
import { Typography } from '@mui/joy';

const CardFolder = ({ ...props }: Folder) => {
  const { id, name, thema, lang, user_id, created_at } = props;
  const { profile, isLoading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card
      id={id}
      sx={(theme) => ({
        gap: 2,
        [theme.getColorSchemeSelector('light')]: {
          backgroundColor: 'darkBlue.white',
        },
        [theme.getColorSchemeSelector('dark')]: {
          backgroundColor: 'darkBlue.softBg',
          borderColor: 'darkBlue.outlinedBorder',
        },
      })}
    >
      <CardContent>
        <Typography level="h2" sx={{ fontSize: '1rem', fontWeight: 500 }}>
          <Link to={`/dashboard/folders/${id}`}>{name}</Link>
        </Typography>
        <Typography level="h3" sx={{ fontSize: '0.75rem', fontWeight: 400 }}>
          {thema}
        </Typography>
      </CardContent>

      {!isLoading && profile && (
        <ContainerFooter>
          <Avatar src={`/src/assets/${profile.avatar}.webp`} alt="avatar user" />
          <CardFooter>
            <Typography level="h4" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
              {t('dashboard.folder.by')} {profile?.firstname}
            </Typography>
            <Typography level="h4" sx={{ fontSize: '0.75rem', fontWeight: 400 }}>
              {created_at ? formatDate(created_at) : ''}
            </Typography>
            <ConatainerLang>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>{t('language')}</Typography>
              {lang === 'fr' ? (
                <FlagIcon>
                  <FR />
                </FlagIcon>
              ) : (
                <FlagIcon>
                  <US />
                </FlagIcon>
              )}
            </ConatainerLang>
          </CardFooter>
        </ContainerFooter>
      )}
    </Card>
  );
};

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 0.2rem;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerFooter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ConatainerLang = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FlagIcon = styled.div`
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Avatar = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 8px;
`;

export default CardFolder;
