import { Quiz } from '@/domain/entities/Quiz';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Box, Typography, Container, Alert, Button } from '@mui/material';
import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function QuizMode() {
  const { id: deckId } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answersOrder, setAnswersOrder] = useState<string[]>([]);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!deckId) return;
        const result = await appContainer.getFlashcardService().getQuizByFolderId(deckId);
        if (result) {
          setQuiz(result);
          // Mélanger les réponses de la première question
          const firstQuestion = result.questions[0];
          const shuffledAnswers = [...firstQuestion.wrongAnswers, firstQuestion.correctAnswer].sort(
            () => Math.random() - 0.5
          );
          setAnswersOrder(shuffledAnswers);
        } else {
          setError('Aucun quiz trouvé pour ce deck');
        }
      } catch (error) {
        console.error('Erreur lors du chargement du quiz:', error);
        setError('Erreur lors du chargement du quiz');
      }
    };
    loadQuiz();
  }, [deckId]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === quiz?.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      // Mélanger les réponses de la prochaine question
      const nextQ = quiz!.questions[currentQuestion + 1];
      const shuffledAnswers = [...nextQ.wrongAnswers, nextQ.correctAnswer].sort(
        () => Math.random() - 0.5
      );
      setAnswersOrder(shuffledAnswers);
    } else {
      setShowResult(true);
    }
  };

  if (!quiz)
    return (
      <Box display="flex" justifyContent="center">
        <Typography>Chargement...</Typography>
      </Box>
    );

  const currentQ = quiz.questions[currentQuestion];
  [...currentQ.wrongAnswers, currentQ.correctAnswer].sort(() => Math.random() - 0.5);

  return (
    <Container maxWidth="md">
      <Box py={4}>
        {error && <Alert severity="error">{error}</Alert>}
        {!showResult ? (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Question {currentQuestion + 1}/{quiz?.questions.length}
              </Typography>
              <Typography variant="h6" mb={3}>
                {quiz?.questions[currentQuestion].question}
              </Typography>
              <Stack spacing={2}>
                {answersOrder.map((answer, index) => (
                  <Box display={'flex'} flexDirection={'column'} key={index}>
                    Réponse {index + 1}
                    <button
                      key={index}
                      onClick={() => handleAnswer(answer)}
                      className={`flex rounded-lg border-2 border-black p-4 text-left text-gray-800 ${
                        selectedAnswer === answer
                          ? answer === quiz?.questions[currentQuestion].correctAnswer
                            ? 'bg-green-500'
                            : 'bg-red-500'
                          : 'd bg-gray-200'
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {answer}
                    </button>
                  </Box>
                ))}
              </Stack>
              {selectedAnswer && (
                <Box mt={4}>
                  <Button
                    variant="contained"
                    sx={{ fontWeight: 'bold', textTransform: 'none' }}
                    color="primary"
                    onClick={nextQuestion}
                    fullWidth
                  >
                    Question suivante
                  </Button>
                </Box>
              )}
            </Box>
          </Stack>
        ) : (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Quiz terminé !
            </Typography>
            <Typography variant="h5">
              Score: {score}/{quiz.questions.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
