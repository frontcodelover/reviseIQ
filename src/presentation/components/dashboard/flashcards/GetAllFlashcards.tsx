import { useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import EndCard from './LastFlashcard';

import { GetUserIdUseCase } from '@/application/useCases/user/GetUserId.usecase';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

import { SupabaseLogRepository } from '@/infrastructure/backend/SupabaseLogRepository';
import { LogActionUseCase } from '@/application/useCases/badge/LogAction.usecase';

import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { GetFlashcardsUseCase } from '@/application/useCases/flashcard/GetFlashcards.usecase';

import { Flashcard } from '@/domain/entities/Flashcard';
import DockNavigate from '../dock/DockNavigate';
import { Card as FlashCardContenaire } from '@mui/joy';
import { Typography } from '@mui/joy';
import styled from '@emotion/styled';

const userRepository = new SupabaseUserRepository();
const logRepository = new SupabaseLogRepository();
const getUserIdCase = new GetUserIdUseCase(userRepository);
const logAction = new LogActionUseCase(logRepository);
const flashcardRepository = new SupabaseFlashCardRepository();
const getFlashcards = new GetFlashcardsUseCase(flashcardRepository);

interface FlipCardProps {
  children: ReactNode;
  onClick?: () => void;
  showAnswer: boolean;
  variant?: 'outlined' | 'plain' | 'soft' | 'solid';
  elevation?: number;
}

const FlipCard = styled(FlashCardContenaire)<FlipCardProps>`
  transform-style: preserve-3d;
  min-height: 40vh;
  cursor: pointer;
  box-shadow:
    0 0 10px 5px rgba(0, 0, 0, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: ${({ showAnswer }) => (showAnswer ? 'rotateY(180deg)' : 'rotateY(Odeg)')};
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
        const id = await getUserIdCase.execute();
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
            await logAction.execute(userId, 'flashcard_reviewed', flashcards.length);
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
        const cards = await getFlashcards.execute(deckId);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const currentCard = isShuffled ? shuffledCards[currentIndex] : flashcards[currentIndex];

  return flashcards.length > 0 ? (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      {isLastCard ? (
        <EndCard onRestart={handleRestart} />
      ) : (
        <div className="relative w-full">
          <FlipCard
            onClick={() => setShowAnswer(!showAnswer)}
            showAnswer={showAnswer}
            variant="outlined"
            elevation={3}
            sx={(theme) => ({
              [theme.getColorSchemeSelector('light')]: {
                backgroundColor: 'darkBlue.white',
              },
              [theme.getColorSchemeSelector('dark')]: {
                backgroundColor: 'darkBlue.softBg',
                borderColor: 'darkBlue.outlinedBorder',
              },
            })}
          >
            <div className="backface-hidden absolute h-full w-full">
              <div className="flex h-full flex-col items-center justify-center rounded-lg">
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
              </div>
            </div>

            <div
              className="backface-hidden absolute h-full w-full"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex h-full flex-col items-center justify-center rounded-lg">
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
                  sx={{ fontSize: '1rem', textAlign: 'center' }}
                >
                  {currentCard.answer}
                </Typography>
              </div>
            </div>
          </FlipCard>
        </div>
      )}

      <span className="text-sm text-gray-500">
        Nombre de Flascards {currentIndex + 1} / {flashcards.length}
      </span>
      <p className="hidden text-sm text-gray-600 sm:flex">
        Astuce : Appuyez sur la touche "A" pour afficher la réponse
      </p>

      <DockNavigate
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setShowAnswer}
        currentIndex={currentIndex}
        flashcards={flashcards}
        deckId={deckId}
        handleShuffle={handleShuffle}
      />
    </div>
  ) : isOwner ? (
    <>
      <div className="text-balance pb-5 pt-5 text-xl font-semibold">
        Comment souhaites-tu créer tes flashcards ? <br />
        <div className="text-base font-normal text-gray-600">Choisis une option ci-dessous</div>
      </div>
      <div className="flex justify-center gap-4">
        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-ai`)}
          className="flex h-80 w-1/2 cursor-pointer flex-col items-center justify-center transition duration-700 ease-in-out hover:bg-sky-200"
        >
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <p className="text-5xl">🤖</p>
            <h2 className="text-xl font-bold">Générer des flashcards avec l'IA</h2>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-manual`)}
          className="flex h-80 w-1/2 cursor-pointer flex-col items-center justify-center transition duration-700 ease-in-out hover:bg-cyan-200"
        >
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <p className="text-5xl">✍</p>
            <h2 className="text-xl font-bold">Créer des flashcards manuellementA</h2>
          </CardContent>
        </Card>
      </div>
    </>
  ) : (
    <div className="text-balance pb-5 pt-5 text-xl font-semibold">
      Aucune flashcard n'a été trouvée. <br />
      <div className="text-base font-normal text-gray-600">
        Le propriétaire de ce deck n'a pas encore créé de flashcard
      </div>
    </div>
  );
}
