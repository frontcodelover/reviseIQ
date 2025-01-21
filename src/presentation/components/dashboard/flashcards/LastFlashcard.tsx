import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';

const Container = styled.div`
  min-height: 70vh;
  width: calc(100% - 10vw);
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Message = styled.p`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.125rem;
`;

const EndCard = ({ onRestart }: { onRestart: () => void }) => (
  <Container>
    <InnerDiv>
      <Title>Félicitations !</Title>
      <Message>Vous avez terminé toutes les flashcards</Message>
      <Button variant="primary" onClick={onRestart}>
        Recommencer
      </Button>
    </InnerDiv>
  </Container>
);

export default EndCard;
