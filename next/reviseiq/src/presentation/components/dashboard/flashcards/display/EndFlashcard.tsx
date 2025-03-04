import { LikeDislike } from '@/presentation/components/dashboard/flashcards/display/LikeDislike';
import { FavoriteButton } from '@/presentation/components/dashboard/shared/FavoriteButton';
import { Button } from '@/presentation/components/ui/button';
import { Card } from '@/presentation/components/ui/card';
import ConfettiExplosion from 'react-confetti-explosion';
import { useTranslations } from 'next-intl';

interface EndCardProps {
  onRestart: () => void;
  deck_id?: string;
}

export function EndCard({ onRestart, deck_id }: EndCardProps) {
  const t = useTranslations();
  return (
    <div className='min-h-[40vh] w-[calc(100%-10vw)]'>
      <Card className='flex flex-col items-center justify-center gap-10 p-10'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='text-2xl font-bold'>{t('flashcard.congratulations')} 🎉</h3>
          <ConfettiExplosion particleCount={100} duration={4000} />
          <p className='text-center text-lg text-muted-foreground'>{t('flashcard.congratulationsMessage')}</p>
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h4 className='text-lg font-semibold'>{t('flashcard.likeThisDeck')}</h4>
          <LikeDislike />
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h4 className='text-lg font-semibold'>{t('flashcard.addToFavorite')}</h4>
          <FavoriteButton deck_id={deck_id ?? ''} />
        </div>
        <Button onClick={onRestart} className='w-full sm:w-auto'>
          {t('flashcard.startAgain')}
        </Button>
      </Card>
    </div>
  );
}

export default EndCard;
