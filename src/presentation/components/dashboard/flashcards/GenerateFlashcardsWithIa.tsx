import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import {
  Input as MuiInput,
  Button as MuiButton,
  CircularProgress,
  Typography,
  Box,
  FormLabel,
} from '@mui/joy';
import Slider from '@mui/joy/Slider';
import { styled } from '@mui/system';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Styled components using MUI Joy
const Input = styled(MuiInput)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const Button = styled(MuiButton)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const FlashcardItem = styled(Box)(() => ({
  borderRadius: '8px',
  border: `1px solid #E0E0E0`,
  padding: '16px',
  marginBottom: '16px',
}));

export function GenerateFlashCardWithIa() {
  const lang = localStorage.getItem('i18nextLng') || 'fr';
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [number, setNumber] = useState(10);

  const fetchData = useCallback(async () => {
    if (deckId) {
      try {
        const folder = await appContainer.getFolderService().getFolderById(deckId);
        setTopic(folder.name);
      } catch (e: unknown) {
        setError((e as Error).message || 'An unexpected error occurred.');
      }
    }
  }, [deckId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await appContainer
        .getFlashcardService()
        .generateFlashcards(topic, number, lang);

      // Assuming the service returns a JSON string, parse it
      const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

      // Check if parsedResult is an array before setting the state
      if (Array.isArray(parsedResult)) {
        setGeneratedCards(parsedResult);
      } else if (typeof parsedResult === 'object' && parsedResult !== null) {
        // If it's an object, create an array containing that object
        setGeneratedCards([parsedResult]);
      } else {
        setError('Erreur lors de la génération des flashcards: Données invalides.');
      }
    } catch (e: unknown) {
      setError('Erreur lors de la génération des flashcards');
      console.error('Flashcard generation failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!generateFlashcards) {
      return;
    }
    try {
      for (const card of generatedCards) {
        await appContainer.getFlashcardService().createFlashcard({
          deck_id: deckId,
          question: card.question,
          answer: card.answer,
          ia_generated: true,
          wrong_one: card.wrong_one,
          wrong_two: card.wrong_two,
          wrong_three: card.wrong_three,
        });
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch (e: unknown) {
      setError('Erreur lors de la sauvegarde');
      console.error('Flashcard save failed:', e);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setNumber(newValue);
    }
  };

  return (
    <Box sx={{ spaceY: 4, padding: 4 }}>
      <Typography level="h2" fontWeight="bold" sx={{ mb: 2 }}>
        Générer avec l'IA
      </Typography>
      {error && <Typography color="danger">{error}</Typography>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography level="h2" fontSize={20} fontWeight={500}>
          Générez des flashcards automatiquement en entrant un sujet et le nombre de flashcards
          souhaité.
        </Typography>
        <Box>
          <Input
            type="text"
            placeholder="Entrez un sujet (e.g., Javascript)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Box>

        <Box>
          <FormLabel htmlFor="number">Nombre de flashcards</FormLabel>
          <Slider
            value={number}
            onChange={handleSliderChange}
            min={1}
            max={50}
            defaultValue={10}
            step={1}
            valueLabelDisplay="auto"
            aria-label="Nombre de flashcards"
          />
        </Box>
      </Box>
      <Button
        onClick={generateFlashcards}
        disabled={!topic.trim() || loading}
        sx={{
          backgroundColor: 'primary.solidActiveBg',
        }}
      >
        {loading ? (
          <>
            <CircularProgress size="sm" />
            <Typography sx={{ ml: 1 }}>Génération en cours...</Typography>
          </>
        ) : (
          'Générer des flashcards'
        )}
      </Button>

      {loading && (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size="lg" />
          <Typography level="h4" sx={{ mt: 1 }}>
            La génération des flashcards est en cours... La durée de ce processus dépend de la
            taille du sujet (environ 30 secondes).
          </Typography>
        </Box>
      )}

      {generatedCards.length > 0 && (
        <>
          <Box sx={{ spaceY: 2 }}>
            {generatedCards.map((card: Flashcard, index: number) => (
              <FlashcardItem key={index}>
                <Typography>
                  <strong>Question:</strong>
                  <Input type="text" value={card.question}>
                    {card.question}
                  </Input>
                </Typography>
                <Typography>
                  <strong>Réponse:</strong> {card.answer}
                </Typography>
              </FlashcardItem>
            ))}
          </Box>
          <Button onClick={handleSubmit}>Sauvegarder les flashcards</Button>
        </>
      )}
    </Box>
  );
}
