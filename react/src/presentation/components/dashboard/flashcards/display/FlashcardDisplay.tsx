import { cn } from '@/lib/utils';
import { Card } from '@/presentation/components/ui/card';

interface FlashcardCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  showAnswer: boolean;
}

export function FlashcardCard({ children, onClick, showAnswer }: FlashcardCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'preserve-3d min-h-[40vh] transform-gpu cursor-pointer transition-transform duration-500',
        'shadow-md hover:shadow-lg',
        showAnswer && 'rotate-y-180'
      )}
    >
      {children}
    </Card>
  );
}
