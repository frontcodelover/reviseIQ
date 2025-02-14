import { Flashcard } from '@/domain/entities/Flashcard';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { appContainer } from '@/infrastructure/config/container';
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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const flashcardRepository = new SupabaseFlashCardRepository();

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

  useEffect(() => {
    async function fetchData() {
      if (deckId) {
        const folder = await appContainer.GetFolderById().execute(deckId);
        setTopic(folder.name);
      }
    }
    fetchData();
  }, [deckId]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await appContainer.GenerateFlashcard().execute(topic, number, lang);
      setGeneratedCards(result);

      // L'utilisateur il puisse avoir la possibilité d'édité la donnée avant de la submit
      if (deckId) {
        await flashcardRepository.storeQuiz(deckId, result);
      }
    } catch {
      setError('Erreur lors de la génération des flashcards');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const card of generatedCards) {
        await appContainer.CreateFlashcard().execute({
          deck_id: deckId,
          question: card.question,
          answer: card.answer,
          ia_generated: true,
        });
      }
      navigate(`/dashboard/folders/${deckId}`);
    } catch {
      setError('Erreur lors de la sauvegarde');
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
            {generatedCards.map((card, index) => (
              <FlashcardItem key={index}>
                <Typography>
                  <strong>Question:</strong> {card.question}
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
