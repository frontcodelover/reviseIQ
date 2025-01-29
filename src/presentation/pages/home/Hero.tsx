import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';
import Text from '@/presentation/components/ui/text/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  background-color: #fff;
`;

const SectionHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1;
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 500px;

  input {
    flex: 1;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border 0.3s ease-in-out;

    &:focus {
      border-color: #0077ff;
    }
  }

  button {
    background: #111;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0077ff;
    }
  }
`;

function HeroTwo() {
  return (
    <Container>
      <SectionHero>
        <TitleGroup>
          <Text size="monster" weight="semibold" font="secondary">
            Apprenez de nouvelles
          </Text>
          <Text size="monster" weight="semibold" font="secondary">
            compétences grâce à des
          </Text>
          <Text
            size="monster"
            weight="semibold"
            font="secondary"
            style={{ textDecoration: '#0077ff wavy underline' }}
          >
            flashcards intelligentes.
          </Text>
        </TitleGroup>
        <Text size="medium" weight="regular" color="secondary" font="primary">
          Créez des flashcards intelligentes grâce à l'IA pour vous <br />
          aider à mémoriser et apprendre plus rapidement.
        </Text>
      </SectionHero>
      <Form>
        <input type="email" placeholder="Enter your work email" />
        <button>Sign me up</button>
      </Form>
    </Container>
  );
}

export default HeroTwo;
