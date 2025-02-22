import { Quiz } from '@/domain/entities/Quiz';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Progress } from '@/presentation/components/ui/progress';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function QuizMode() {
  const { id: deckId } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answersOrder, setAnswersOrder] = useState<string[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!deckId) return;
        const result = await appContainer.getFlashcardService().getQuizByFolderId(deckId);
        if (result) {
          setQuiz(result);
          const firstQuestion = result.questions[0];
          const shuffledAnswers = [...firstQuestion.wrongAnswers, firstQuestion.correctAnswer].sort(
            () => Math.random() - 0.5
          );
          setAnswersOrder(shuffledAnswers);
        } else {
          setError(t('quiz.noQuiz'));
        }
      } catch (error) {
        console.error(error);
        setError(t('quiz.error'));
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
    if (!quiz) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      const nextQ = quiz.questions[currentQuestion + 1];
      const shuffledAnswers = [...nextQ.wrongAnswers, nextQ.correctAnswer].sort(
        () => Math.random() - 0.5
      );
      setAnswersOrder(shuffledAnswers);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);

    try {
      if (!deckId) return;
      const result = await appContainer.getFlashcardService().getQuizByFolderId(deckId);
      if (result) {
        setQuiz(result);
        const firstQuestion = result.questions[0];
        const shuffledAnswers = [...firstQuestion.wrongAnswers, firstQuestion.correctAnswer].sort(
          () => Math.random() - 0.5
        );
        setAnswersOrder(shuffledAnswers);
      }
    } catch (error) {
      console.error(error);
      setError(t('quiz.error'));
    }
  };

  if (!quiz) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="container mx-auto max-w-3xl p-4">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : !showResult ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                Question {currentQuestion + 1}/{quiz.questions.length}
              </span>
              <span className="text-sm font-normal">
                {t('quiz.score')} {score}/{currentQuestion}
              </span>
            </CardTitle>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-xl font-semibold">{quiz.questions[currentQuestion].question}</p>

            <div className="grid gap-3">
              {answersOrder.map((answer, index) => {
                const isCorrect = answer === quiz.questions[currentQuestion].correctAnswer;
                const isSelected = selectedAnswer === answer;

                return (
                  <Button
                    key={index}
                    variant={isSelected ? (isCorrect ? 'success' : 'destructive') : 'outline'}
                    className={cn(
                      'group h-auto min-h-[60px] w-full justify-start p-4 text-left',
                      'transition-all duration-200',
                      selectedAnswer && 'cursor-not-allowed',
                      'hover:bg-muted/50'
                    )}
                    onClick={() => handleAnswer(answer)}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex w-full min-w-0 items-start gap-2">
                      <div className="flex-shrink-0 pt-0.5">
                        {isSelected &&
                          (isCorrect ? (
                            <CheckCircle2 className="text-success h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="whitespace-pre-wrap break-words text-sm leading-normal">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>

          {selectedAnswer && (
            <CardFooter className="flex justify-end border-t p-4">
              <Button onClick={nextQuestion} size="lg">
                {currentQuestion < quiz.questions.length - 1 ? t('quiz.next') : t('quiz.end')}
              </Button>
            </CardFooter>
          )}
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">{t('quiz.finised')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl">
              {t('quiz.score')} {score}/{quiz.questions.length}
            </p>
            <p className="text-muted-foreground">
              {score === quiz.questions.length ? t('quiz.congrats') : t('quiz.continue')}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link to={`/dashboard/folders/${deckId}`} className="block w-full">
              <Button size="lg" className="w-full">
                {t('quiz.revise')}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full" onClick={resetQuiz}>
              {t('quiz.retry')}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
