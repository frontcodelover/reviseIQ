import { Folder } from '@/domain/entities/Folder';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { Typography } from '@mui/joy';
import Card from '@mui/joy/Card';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const RandomCard = ({ ...props }: Folder) => {
  const { id, name, lang, user_id } = props;
  const { profile, isLoading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card
      id={id}
      sx={{
        border: 'none',
        boxShadow: '0 0 2px 0 rgba(0 0 0 / 0.2),0 5px 17px -4px rgba(0 0 0 / 0.12)',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        backgroundColor: 'var(--joy-palette-primary-plainHoverBg)',
        color: 'white',
      }}
    >
      <CardContent>
        <Typography level="h2" sx={{ fontSize: '1rem', fontWeight: 500 }}>
          <Link to={`/dashboard/folders/${id}`}>{name}</Link>
        </Typography>
      </CardContent>

      {!isLoading && profile && (
        <ContainerFooter>
          <CardFooter>
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

export default RandomCard;
