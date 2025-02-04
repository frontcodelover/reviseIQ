import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';

const EndCard = ({ onRestart }: { onRestart: () => void }) => (
  <Container>
    <InnerDiv>
      <Title>Félicitations !</Title>
      <Message>Vous avez terminé toutes les flashcards</Message>
      <Button $variant="primary" onClick={onRestart}>
        Recommencer
      </Button>
    </InnerDiv>
  </Container>
);

const Container = styled.div`
  min-height: 40vh;
  width: calc(100% - 10vw);
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

  background-color: #fff;
  padding: 1.5rem;
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

export default EndCard;
