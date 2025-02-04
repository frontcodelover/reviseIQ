import styled from 'styled-components';
import { useProfile } from '@/presentation/hooks/useProfile';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import Text from '@/presentation/components/ui/text/Text';
import { useTranslation } from 'react-i18next';

const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  margin: 2rem 0;
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

function Greetings() {
  const { profile, loading, error } = useProfile();
  const { t } = useTranslation();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  return (
    <GreetingsContainer>
      <HeadingOne $size="xxlarge" $color="black" $weight="semibold">
        {t('dashboard.greetings')} {profile.firstname} 👋
      </HeadingOne>
      <ParagraphContainer>
        <Text $size="medium" $color="secondary" $weight="regular">
          {t('dashboard.greetings2')}
        </Text>
      </ParagraphContainer>
    </GreetingsContainer>
  );
}

export default Greetings;
