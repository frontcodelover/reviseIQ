import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';
import learn from '@/assets/learn-min.jpg';
import Text from '@/presentation/components/ui/text/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 40vh;
  background-color: #fff;
  padding: 4rem;
  border-radius: 32px;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 5rem 1rem;
  }
`;
const SectionHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImgContainer = styled.div`
  gap: 1rem;
  max-width: 250px;
  height: 300px;
  border-radius: 32px;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ImgContainerTwo = styled.div`
  gap: 1rem;
  max-width: 250px;
  height: 300px;
  border-radius: 32px;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const ImgSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  height: auto;
`;

const ImgOneSection = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
`;

const ImgTwoSection = styled.div`
  display: flex;
  height: 100%;
  align-items: end;
`;

function HeroTwo() {
  return (
    <Container>
      <SectionHero>
        <Heading>
          <TitleGroup>
            <Text size="xxxlarge" weight="semibold" style={{ color: '#0077FF' }}>
              Apprenez de nouvelles
            </Text>
            <Text size="xxxlarge" weight="semibold" style={{ color: '#0091ff' }}>
              compétences grâce à des
            </Text>
            <Text size="xxxlarge" weight="semibold" style={{ color: '#00bbff' }}>
              flashcards intelligentes.
            </Text>
          </TitleGroup>
          <Text size="medium" weight="regular" color="third">
            Créez des flashcards intelligentes grâce à l'IA pour vous <br />
            aider à mémoriser et apprendre plus rapidement.
          </Text>
          <Button variant="primary" style={{ width: 'fit-content' }}>
            Commencez gratuitement
          </Button>
        </Heading>
        <ImgSection>
          <ImgOneSection>
            <ImgContainer>
              <StyledImage src={learn} alt="Learn" />
            </ImgContainer>
          </ImgOneSection>
          <ImgTwoSection>
            <ImgContainerTwo>
              <StyledImage src={learn} alt="Learn" />
            </ImgContainerTwo>
          </ImgTwoSection>
        </ImgSection>
      </SectionHero>
    </Container>
  );
}

export default HeroTwo;
