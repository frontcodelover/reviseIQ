import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Card, Typography, Box } from '@mui/joy';
import { CircularProgress, Card as UICard, CardContent as UICardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { DockNavigate } from '../dock/DockNavigate';
import EndCard from './LastFlashcard';

interface FlipCardProps {
  children: ReactNode;
  onClick?: () => void;
  showAnswer: boolean;
  variant?: 'outlined' | 'plain' | 'soft' | 'solid';
  elevation?: number;
}

const FlipCard = styled(Card)<FlipCardProps>`
  transform-style: preserve-3d;
  min-height: 40vh;
  cursor: pointer;
  box-shadow:
    0 0 10px 5px rgba(0, 0, 0, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: ${({ showAnswer }) => (showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

export function GetFlashcards({ isOwner }: { isOwner: boolean }) {
  const { id: deckId } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoggedCompletion, setHasLoggedCompletion] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const isLastCard = currentIndex === flashcards.length;
  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await appContainer.getUserService().getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'userId:", error);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (isLastCard && !hasLoggedCompletion && flashcards.length > 0) {
      const logCompletion = async () => {
        try {
          if (userId) {
            await appContainer
              .getLogService()
              .logAction(userId, 'flashcard_reviewed', flashcards.length);
          } else {
            console.error('User ID is null');
          }
          setHasLoggedCompletion(true);
        } catch (error) {
          console.error("Erreur lors du log de l'action :", error);
        }
      };
      logCompletion();
    }
  }, [isLastCard, hasLoggedCompletion, flashcards.length, userId]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) return;
      try {
        const cards = await appContainer.getFlashcardService().getFlashcardsList(deckId);
        setFlashcards(cards);
      } catch {
        setError('Erreur lors du chargement des flashcards');
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, [deckId]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        setShowAnswer(!showAnswer);
      } else if (e.code === 'ArrowRight' && currentIndex <= flashcards.length - 1) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 100); // Délai harmonisé à 1000ms
      } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
        setShowAnswer(false);
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
        }, 1000); // Délai harmonisé à 1000ms
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showAnswer, flashcards.length]);

  const handleRestart = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentIndex(0);
    }, 200);
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setIsShuffled(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  if (loading)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography sx={{ color: 'error.main' }}>{error}</Typography>;

  const currentCard = isShuffled ? shuffledCards[currentIndex] : flashcards[currentIndex];

  return flashcards.length > 0 ? (
    <Box
      sx={{
        display: 'flex',
        minHeight: '40vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      {isLastCard ? (
        <EndCard onRestart={handleRestart} />
      ) : (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <FlipCard
            onClick={() => setShowAnswer(!showAnswer)}
            showAnswer={showAnswer}
            variant="outlined"
            elevation={3}
          >
            <Box
              sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backfaceVisibility: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRadius: 'lg',
                }}
              >
                <Typography
                  level="h2"
                  fontWeight={500}
                  sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                >
                  {t('flashcard.question')} 🤔
                </Typography>

                <Typography
                  level="h3"
                  fontWeight={500}
                  sx={{ fontSize: '1rem', textAlign: 'center' }}
                >
                  {currentCard.question}{' '}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRadius: 'lg',
                }}
              >
                <Typography
                  level="h2"
                  fontWeight={500}
                  sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                >
                  {t('flashcard.answer')} ✅
                </Typography>

                <Typography
                  level="h3"
                  fontWeight={500}
                  width="90%"
                  sx={{ fontSize: '1rem', textAlign: 'center' }}
                >
                  {currentCard.answer}
                </Typography>
              </Box>
            </Box>
          </FlipCard>
        </Box>
      )}

      <Typography>
        Nombre de Flascards {currentIndex + 1} / {flashcards.length}
      </Typography>
      <Typography>Astuce : Appuyez sur la touche "A" pour afficher la réponse</Typography>

      <DockNavigate
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setShowAnswer}
        currentIndex={currentIndex}
        flashcards={flashcards}
        deckId={deckId}
        handleShuffle={handleShuffle}
      />
    </Box>
  ) : isOwner ? (
    <Box>
      <Typography
        level="h1"
        sx={{
          textAlign: 'center',
          paddingBottom: 5,
          paddingTop: 5,
          fontSize: 'xl',
          fontWeight: 'semibold',
          width: '100%',
          wordBreak: 'balance',
        }}
      >
        Comment souhaitez-tu créer vos flashcards ? <br />
        <Typography
          level="h2"
          sx={{ fontSize: 'lg', fontWeight: 'normal', color: 'text.secondary' }}
        >
          Choisissez une option ci-dessous
        </Typography>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <UICard
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-ai`)}
          sx={{
            display: 'flex',
            height: 320,
            width: '50%',
            cursor: 'pointer',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.7s ease-in-out',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <UICardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Typography fontSize={32}>🤖</Typography>
            <Typography level="h3" sx={{ fontSize: 'xl', fontWeight: 'bold', color: 'white' }}>
              Générer des flashcards avec l'IA
            </Typography>
          </UICardContent>
        </UICard>
        <UICard
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-manual`)}
          sx={{
            display: 'flex',
            height: 320,
            width: '50%',
            cursor: 'pointer',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.7s ease-in-out',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <UICardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Typography fontSize={32}>✍</Typography>
            <Typography level="h3" sx={{ fontSize: 'xl', fontWeight: 'bold', color: 'white' }}>
              Créer des flashcards manuellement
            </Typography>
          </UICardContent>
        </UICard>
      </Box>
    </Box>
  ) : (
    <Typography
      sx={{
        textAlign: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 'xl',
        fontWeight: 'semibold',
        width: '100%',
        wordBreak: 'balance',
      }}
    >
      Aucune flashcard n'a été trouvée. <br />
      <Typography sx={{ fontSize: 'base', fontWeight: 'normal', color: 'text.secondary' }}>
        Le propriétaire de ce deck n'a pas encore créé de flashcard
      </Typography>
    </Typography>
  );
}
