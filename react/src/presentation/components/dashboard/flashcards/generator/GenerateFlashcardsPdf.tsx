import { Flashcard } from '@/domain/entities/Flashcard';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { Progress } from '@/presentation/components/ui/progress';
import { Slider } from '@/presentation/components/ui/slider';
import { Textarea } from '@/presentation/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import pdfToText from 'react-pdftotext';
import { useNavigate, useParams } from 'react-router-dom';

const MAX_FILE_SIZE = 1024 * 1024; // 1Mo en bytes

export function GenerateFlashcardsByPdf() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: deckId } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [numCards, setNumCards] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(t('fromPdf.fileToBig'));
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    try {
      const text = await pdfToText(selectedFile);
      setPdfText(text);
    } catch (err) {
      setError(t('fromPdf.readingError') + err);
      e.target.value = '';
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading && progress < 99) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 99));
      }, 1000);
    }

    if (!isLoading) {
      setProgress(0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoading, progress]);

  const handleGenerate = async () => {
    if (!pdfText) return;

    setIsLoading(true);
    setError(null);

    try {
      const lang = localStorage.getItem('lang') || 'fr';
      const flashcards = await appContainer
        .getFlashcardService()
        .generateWithText(pdfText, numCards, lang);
      setGeneratedCards(flashcards);
    } catch (err) {
      setError(t('fromPdf.error') + err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFlashcard = (index: number, field: keyof Flashcard, value: string) => {
    setGeneratedCards((cards) =>
      cards.map((card, i) => (i === index ? { ...card, [field]: value } : card))
    );
  };

  const handleSubmit = async () => {
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
      setError('Error' + e);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <h2 className="text-2xl font-bold text-foreground">{t('fromPdf.title')}</h2>
      <h3 className="text-lg font-medium">{t('fromPdf.uploadDocument')}</h3>
      <div className="space-y-4">
        <div className="space-y-6">
          <Card className="w-full p-6">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">{t('fromPdf.upload')}</Label>
                <Input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileChange} />
              </div>

              {file && (
                <div className="space-y-2">
                  <Label>{t('fromPdf.fileSelected')}</Label>
                  <p>{file.name}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>{t('fromPdf.numberFlashcards')}</Label>
                <Slider
                  min={1}
                  max={25}
                  step={1}
                  value={[numCards]}
                  onValueChange={(value) => setNumCards(value[0])}
                  className="my-4"
                />
                <p className="text-right text-sm text-muted-foreground">{numCards} flashcards</p>
              </div>

              <Button onClick={handleGenerate} disabled={!pdfText || isLoading} className="w-full">
                {isLoading ? t('fromPdf.processing') : t('fromPdf.generate')}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {isLoading && (
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
                          className={cn(
                            'min-h-[100px] resize-none',
                            'focus:ring-2 focus:ring-primary'
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`answer-${index}`}>{t('flashcard.answer')}:</Label>
                        <Textarea
                          id={`answer-${index}`}
                          value={card.answer}
                          onChange={(e) => updateFlashcard(index, 'answer', e.target.value)}
                          placeholder={t('flashcard.answerPlaceholder')}
                          className={cn(
                            'min-h-[100px] resize-none',
                            'focus:ring-2 focus:ring-primary'
                          )}
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
                  disabled={generatedCards.some(
                    (card) => !card.question.trim() || !card.answer.trim()
                  )}
                >
                  {t('flashcard.save')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
