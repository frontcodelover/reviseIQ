import { useState } from 'react';
import styled from 'styled-components';
import TextInput from '@/presentation/components/ui/input/TextInput';
import Button from '@/presentation/components/ui/button/Button';
import { Plus, Trash2 } from 'lucide-react';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { CreateFlashcardUseCase } from '@/application/useCases/CreateFlashcard.usecase';
import { useParams, useNavigate } from 'react-router-dom';

const flashcardRepository = new SupabaseFlashCardRepository();
const createFlashcard = new CreateFlashcardUseCase(flashcardRepository);

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
`;

const FlashcardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`;

const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: auto 0.5rem;
  justify-content: center;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
`;

function GenerateFlashcardManual() {
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([
    { id: Date.now() as number, question: '', answer: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: Date.now(), question: '', answer: '' }]);
  };

  const updateFlashcard = (id: number, field: 'question' | 'answer', value: string) => {
    setFlashcards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const removeFlashcard = (id: number) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const card of flashcards) {
        if (card.question.trim() && card.answer.trim()) {
          await createFlashcard.execute({
            deck_id: deckId,
            question: card.question,
            answer: card.answer,
          });
        }
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch {
      setError('Erreur lors de la création des flashcards');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Créer manuellement</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {flashcards.map((card) => (
        <FlashcardContainer key={card.id}>
          <TextInput
            type="text"
            placeholder="Question"
            value={card.question}
            onChange={(e) => updateFlashcard(card.id, 'question', e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Réponse"
            value={card.answer}
            onChange={(e) => updateFlashcard(card.id, 'answer', e.target.value)}
          />
          <IconButton variant="danger" onClick={() => removeFlashcard(card.id)}>
            <Icon>
              <Trash2 />
            </Icon>
          </IconButton>
        </FlashcardContainer>
      ))}

      <IconButton variant="primary" onClick={addFlashcard}>
        <Icon>
          <Plus />
        </Icon>
        Ajouter une carte
      </IconButton>

      <Button
        variant="success"
        onClick={handleSubmit}
        disabled={loading || flashcards.length === 0}
      >
        {loading ? 'Sauvegarde...' : 'Sauvegarder les flashcards'}
      </Button>
    </Container>
  );
}

export default GenerateFlashcardManual;
