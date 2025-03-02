import { Folder } from '@/domain/entities/Folder';
import { formatDate } from '@/lib/FormatDate';
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/presentation/components/ui/card';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function CardFolderRank({ id, name, thema, lang, user_id, created_at, score }: Folder) {
  const { profile, isLoading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  const translatedThema = thema
    ? t(`dashboard.folder.thema.${thema.toLowerCase()}`)
    : t('dashboard.folder.thema.other');

  return (
    <Card className="flex w-full flex-col justify-between">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Link to={`/dashboard/folders/${id}`} className="text-lg font-semibold hover:underline">
              {name}
            </Link>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ThumbsUp className="h-4 w-4" />
              <span>{score || 0}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{translatedThema}</p>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        {isLoading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
          </div>
        ) : profile ? (
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={profile.avatar}
                alt={`${profile.firstname}'s avatar`}
                className="object-cover"
              />
              <AvatarFallback>{profile.firstname?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t('dashboard.folder.by')} {profile.firstname}
              </p>
              <p className="text-xs text-muted-foreground">
                {created_at ? formatDate(created_at) : ''}
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <span className="text-sm">{t('language')}:</span>
          <span className="text-sm font-semibold">{lang.toUpperCase()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
