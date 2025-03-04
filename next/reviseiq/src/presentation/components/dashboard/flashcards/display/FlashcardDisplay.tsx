import { cn } from '@/lib/utils';
import { Card } from '@/presentation/components/ui/card';
import { useTranslations } from 'next-intl';
interface FlashcardCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onClick?: () => void;
  showAnswer: boolean;
}

export function FlashcardCard({ frontContent, backContent, onClick, showAnswer }: FlashcardCardProps) {
  const t = useTranslations();
  return (
    <div className='w-full h-[400px] perspective'>
      <div onClick={onClick} className={cn('relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer', showAnswer && 'rotate-y-180')}>
        <Card className='absolute w-full h-full backface-hidden'>
          <div className='flex items-center justify-center h-full flex-col p-6'>
            <h2 className='mb-2 text-center text-xl font-medium md:mb-4 md:text-2xl'>{t('flashcard.question')} 🤔</h2>
            <div>{frontContent}</div>
          </div>
        </Card>

        <Card className='absolute w-full h-full backface-hidden rotate-y-180'>
          <div className='flex items-center justify-center h-full flex-col p-6'>
            <h2 className='mb-2 text-center text-xl font-medium md:mb-4 md:text-2xl'>{t('flashcard.answer')} ✅</h2>
            <div>{backContent}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
