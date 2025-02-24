import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { Button } from '@/presentation/components/ui/button';
import { Card } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { Progress } from '@/presentation/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/presentation/components/ui/radio-group';
import { Slider } from '@/presentation/components/ui/slider';
import { Textarea } from '@/presentation/components/ui/textarea';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

export function GenerateFlashCardWithIa() {
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng') || 'fr';
  const { id: deckId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [number, setNumber] = useState(10);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');

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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading && progress < 99) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 3, 99));
      }, 1500);
    }

    if (!loading) {
      setProgress(0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [loading, progress]);

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await appContainer
        .getFlashcardService()
        .generateFlashcards(topic, number, lang, level);

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

  // Fonction pour mettre à jour une flashcard
  const updateFlashcard = (index: number, field: keyof Flashcard, value: string) => {
    setGeneratedCards((cards) =>
      cards.map((card, i) => (i === index ? { ...card, [field]: value } : card))
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-foreground">{t('flashcard.generateWithIa')}</h2>

      {error && <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>}

      <h2 className="text-lg font-medium">{t('flashcard.generateDescription')}</h2>
      <Card className="space-y-6 p-6">
        <div className="space-y-2">
          <div className="space-y-4">
            <Label htmlFor="number-slider">{t('flashcard.subject')}</Label>
            <Input
              type="text"
              placeholder="Subject"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="number-slider">{t('flashcard.nbFlashcard')}</Label>
          <Slider
            id="number-slider"
            value={[number]}
            onValueChange={(value) => setNumber(value[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{number} flashcards</span>
        </div>

        <div className="space-y-4">
          <Label htmlFor="level">{t('flashcard.chooseDifficulty')}</Label>
          <RadioGroup
            defaultValue={level}
            onValueChange={(value: 'easy' | 'medium' | 'hard') => setLevel(value)}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="easy" id="easy" className="peer sr-only" />
              <Label
                htmlFor="easy"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>{t('flashcard.easy')}</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
              <Label
                htmlFor="medium"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>{t('flashcard.medium')}</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="hard" id="hard" className="peer sr-only" />
              <Label
                htmlFor="hard"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>{t('flashcard.hard')}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={generateFlashcards} disabled={!topic.trim() || loading} className="w-full">
          {loading ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {t('flashcard.processing')}
            </>
          ) : (
            t('flashcard.generate')
          )}
        </Button>
      </Card>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <Progress value={progress} className="w-[60%]" />
          <p className="text-center text-lg text-muted-foreground">
            {t('flashcard.iaGeneratedProgress')}
            <br />
            {t('flashcard.iaGeneratedProgressInfos')}
          </p>
        </div>
      )}

      {generatedCards.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-4">
            {generatedCards.map((card: Flashcard, index: number) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${index}`}>{t('flashcard.question')}:</Label>
                    <Textarea
                      id={`question-${index}`}
                      value={card.question}
                      onChange={(e) => updateFlashcard(index, 'question', e.target.value)}
                      placeholder={t('flashcard.questionPlaceholder')}
                      className={cn('min-h-[100px] resize-none', 'focus:ring-2 focus:ring-primary')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${index}`}>{t('flashcard.answer')}:</Label>
                    <Textarea
                      id={`answer-${index}`}
                      value={card.answer}
                      onChange={(e) => updateFlashcard(index, 'answer', e.target.value)}
                      placeholder={t('flashcard.answerPlaceholder')}
                      className={cn('min-h-[100px] resize-none', 'focus:ring-2 focus:ring-primary')}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setGeneratedCards((cards) => cards.filter((_, i) => i !== index));
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      {t('flashcard.delete')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setGeneratedCards([])}>
              {t('flashcard.cancel')}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={generatedCards.some((card) => !card.question.trim() || !card.answer.trim())}
            >
              {t('flashcard.save')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
