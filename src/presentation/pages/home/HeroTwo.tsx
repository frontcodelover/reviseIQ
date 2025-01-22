import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';
import learn from '@/assets/learn-min.jpg';

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
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2.5rem;

  div {
    color: #374151;

    &:last-child {
      color: #6b7280;
    }
  }

  @media (min-width: 768px) {
    text-align: left;
    div {
      font-size: 1rem;
      &:last-child {
        font-size: 1rem;
      }
    }
  }
`;

const HeadingText = styled.h1`
  font-size: 3rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const ImgContainer = styled.div`
  gap: 1rem;
  max-width: 300px;
  height: 350px;
  border-radius: 32px;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ImgContainerTwo = styled.div`
  gap: 1rem;
  max-width: 300px;
  height: 350px;
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

const Baseline = styled.p`
  color: #6b7280;
  font-size: 1.25rem;
`;

const ImgSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  width: 100%;
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
            <HeadingText style={{ color: '#0077FF' }}>Créez et apprenez</HeadingText>
            <HeadingText style={{ color: '#0091ff' }}>Grâce aux flashcards</HeadingText>
            <HeadingText style={{ color: '#00bbff' }}>Intelligentes et l'IA</HeadingText>
          </TitleGroup>
          <Baseline>
            Créez des flashcards intelligentes grâce à l'IA pour vous aider à mémoriser et apprendre
            plus rapidement.
          </Baseline>
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
