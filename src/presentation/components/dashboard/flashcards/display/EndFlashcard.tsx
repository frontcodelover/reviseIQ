import { Button } from '@/presentation/components/ui/button';
import { Card } from '@/presentation/components/ui/card';
import { useTranslation } from 'react-i18next';

interface EndCardProps {
  onRestart: () => void;
}

export function EndCard({ onRestart }: EndCardProps) {
  const { t } = useTranslation();
  return (
    <div className="min-h-[40vh] w-[calc(100%-10vw)]">
      <Card className="flex flex-col items-center justify-center space-y-6 p-6">
        <h3 className="text-xl font-bold">{t('flashcard.congratulations')}</h3>

        <p className="text-center text-lg text-muted-foreground">
          {t('flashcard.congratulationsMessage')}
        </p>

        <Button onClick={onRestart} className="w-full sm:w-auto">
          {t('flashcard.startAgain')}
        </Button>
      </Card>
    </div>
  );
}

export default EndCard;
