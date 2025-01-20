import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz } from '@/domain/entities/Quiz';
import { GetQuizByDeckIdUseCase } from '@/application/useCases/GetQuizByDeckId.usecase';
import { Button } from '@/components/ui/button';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';

export default function QuizMode() {
  const { id: deckId } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answersOrder, setAnswersOrder] = useState<string[]>([]);

  const quizRepository = new SupabaseFlashCardRepository();
  const getQuizByDeckIdUseCase = new GetQuizByDeckIdUseCase(quizRepository);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!deckId) return;
        const result = await getQuizByDeckIdUseCase.execute(deckId);
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

  if (!quiz) return <div>Chargement...</div>;

  const currentQ = quiz.questions[currentQuestion];
  [...currentQ.wrongAnswers, currentQ.correctAnswer].sort(() => Math.random() - 0.5);

  return (
    <div className="mx-auto max-w-2xl p-4">
      {error && <div className="text-red-500">{error}</div>}
      {!showResult ? (
        <>
          <div className="mb-4">
            <div className="mb-4 text-xl font-bold">
              Question {currentQuestion + 1}/{quiz?.questions.length}
            </div>
            <div className="mb-6 text-lg">{quiz?.questions[currentQuestion].question}</div>
            <div className="space-y-2">
              {answersOrder.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  className={`w-full p-4 text-gray-800 hover:text-white ${
                    selectedAnswer === answer
                      ? answer === quiz?.questions[currentQuestion].correctAnswer
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-gray-100'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </Button>
              ))}
            </div>
            {selectedAnswer && (
              <Button onClick={nextQuestion} className="mt-4">
                Question suivante
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Quiz terminé !</h2>
          <p className="text-xl">
            Score: {score}/{quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
