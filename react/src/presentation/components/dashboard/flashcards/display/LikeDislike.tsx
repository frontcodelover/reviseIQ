import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { useProfile } from '@/presentation/hooks/useProfile';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface URLParams {
  id: string;
  [key: string]: string | undefined;
}

export function LikeDislike() {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { id: folderIdFromUrl } = useParams<URLParams>();

  useEffect(() => {
    const fetchUserVote = async () => {
      if (!profile?.user_id || !folderIdFromUrl) return;

      try {
        const vote = await appContainer
          .getFolderService()
          .getUserVote(folderIdFromUrl, profile.user_id);
        if (vote !== null) {
          setIsLiked(vote === 1);
        }
      } catch (error) {
        console.error('Error fetching user vote:', error);
      }
    };

    fetchUserVote();
  }, [folderIdFromUrl, profile?.user_id]);

  const handleVote = async (isPositive: boolean) => {
    if (!profile?.user_id || !folderIdFromUrl) {
      toast.error('Vous devez être connecté pour voter');
      return;
    }

    setIsLoading(true);
    try {
      // Cas de suppression du vote
      if ((isPositive && isLiked === true) || (!isPositive && isLiked === false)) {
        await appContainer.getFolderService().removeVoteFolder(folderIdFromUrl, profile.user_id);
        setIsLiked(null);
        toast.success('Vote supprimé avec succès', {
          description: 'Votre vote a été retiré',
          icon: '🗑️',
        });
        return;
      }

      // Cas d'ajout/modification du vote
      await appContainer
        .getFolderService()
        .addVoteFolder(folderIdFromUrl, profile.user_id, isPositive ? 1 : -1);

      const toastMessage = isPositive ? "J'aime ajouté" : "Je n'aime pas ajouté";
      const toastIcon = isPositive ? '👍' : '👎';

      toast(toastMessage, {
        description: 'Votre vote a été enregistré avec succès',
        icon: toastIcon,
        className: isPositive
          ? 'bg-primary text-primary-foreground'
          : 'bg-destructive text-destructive-foreground',
      });

      setIsLiked(isPositive);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Impossible d'enregistrer votre vote";
      toast.error(errorMessage, {
        description: 'Veuillez réessayer.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={isLiked === true ? 'default' : 'ghost'}
        size="icon"
        onClick={() => handleVote(true)}
        disabled={isLoading}
        className="transition-all duration-200 hover:scale-110 disabled:opacity-50"
      >
        <ThumbsUp
          className={`h-5 w-5 ${
            isLiked === true ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
        />
      </Button>

      <Button
        variant={isLiked === false ? 'default' : 'ghost'}
        size="icon"
        onClick={() => handleVote(false)}
        disabled={isLoading}
        className="transition-all duration-200 hover:scale-110 disabled:opacity-50"
      >
        <ThumbsDown
          className={`h-5 w-5 ${
            isLiked === false ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
        />
      </Button>
    </div>
  );
}
