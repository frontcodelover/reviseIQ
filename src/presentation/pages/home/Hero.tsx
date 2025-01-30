import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Text from '@/presentation/components/ui/text/Text';
import Button from '@/presentation/components/ui/button/Button';
import socialProof from '@/assets/socialProof.png';
import wave from '@/assets/wave.png';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1080px;
  height: 80vh;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  background-color: #fff;
`;

const SectionHero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1;
`;

const ButtonContainer = styled(Button)`
  display: flex;
  justify-content: center;
  width: fit-content;
  gap: 0.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  & :hover {
    background-color: #057eff;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SocialProof = styled.img`
  width: auto;
`;

const WaveImage = styled.span`
  width: auto;
  background-image: url(${wave});
  background-size: contain;
  background-position: 0 100%;
  background-repeat: no-repeat;
  padding: 0 0 1rem 0;
  display: inline-block;
  margin: 0 0.5rem;
  line-height: 1;
`;

function HeroTwo() {
  const { t } = useTranslation();

  return (
    <Container>
      <SectionHero>
        <TitleGroup>
          <Text size="monster" weight="semibold">
            <Trans
              i18nKey="home.title"
              components={{
                WaveImage: <WaveImage />,
              }}
            />
          </Text>
        </TitleGroup>
        <Text size="xlarge" weight="regular" color="secondary">
          <Trans i18nKey="home.description" />
        </Text>
        <Link to="/signup">
          <ButtonContainer size="large" variant="primary">
            {t('home.cta')}
            <ArrowRight size={24} />
          </ButtonContainer>
        </Link>
        <SocialContainer>
          <SocialProof src={socialProof} alt="Social proof" />
          <Text size="regular" weight="regular" color="secondary">
            {t('home.community')}
          </Text>
        </SocialContainer>
      </SectionHero>
    </Container>
  );
}

export default HeroTwo;
