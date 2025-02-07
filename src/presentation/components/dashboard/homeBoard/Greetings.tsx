import styled from 'styled-components';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/joy';

function Greetings() {
  const { profile, loading, error } = useProfile();
  const { t } = useTranslation();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  return (
    <GreetingsContainer>
      <Typography level="h1" noWrap fontWeight={600}>
        {t('dashboard.greetings')} {profile.firstname} 👋
      </Typography>
      <ParagraphContainer>
        <Typography>{t('dashboard.greetings2')}</Typography>
      </ParagraphContainer>
    </GreetingsContainer>
  );
}
const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  margin: 1rem 0;
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export default Greetings;
