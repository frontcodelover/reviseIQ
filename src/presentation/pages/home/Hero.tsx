import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '@/presentation/components/ui/button/Button';
import learn from '@/assets/learn-min.jpg';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  opacity: 1;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0) 65%);
    pointer-events: none;
  }
`;

const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: right top;
`;

const ContentContainer = styled.div`
  position: absolute;
  inset: 2.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    width: 50%;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  color: #8a8a8a;
`;

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Container id="home">
      <ImageWrapper>
        <BackgroundImage src={learn} alt="Background Image" />
      </ImageWrapper>
      <ContentContainer>
        <TextContainer>
          <Title>{t('home.title')}</Title>
          <Description>{t('home.description')}</Description>
          <Button variant="primary">{t('home.cta')}</Button>
        </TextContainer>
      </ContentContainer>
    </Container>
  );
};

export default Hero;
