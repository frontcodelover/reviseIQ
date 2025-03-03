import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Button } from '@/presentation/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip';
import { useFolderFavorite } from '@/presentation/hooks/useFolderFavorite';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FavoriteButtonProps {
  deck_id: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showCount?: boolean;
  className?: string;
}

/**
 * Button component for adding/removing folders from favorites
 */
export function FavoriteButton({
  deck_id,
  variant = 'outline',
  size = 'sm',
  showCount = true,
  className = '',
}: FavoriteButtonProps) {
  const  t  = useTranslations();

  const { isFavorite, isLoading, followersCount, toggleFavorite } = useFolderFavorite(deck_id);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={`${className} ${isFavorite ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50' : ''}`}
            onClick={toggleFavorite}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <>
                <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                {showCount && followersCount > 0 && <span className="ml-2">{followersCount}</span>}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isFavorite
            ? t('dashboard.folder.removeFromFavorites')
            : t('dashboard.folder.addToFavorites')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
