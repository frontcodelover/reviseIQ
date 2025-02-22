import { Folder } from '@/domain/entities/Folder';
import { Card, CardContent, CardFooter } from '@/presentation/components/ui/card';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function RandomCard({ id, name, lang, user_id }: Folder) {
  const { profile, isLoading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card className="flex h-full max-w-96 flex-col gap-2 p-4 hover:bg-primary/90">
      <CardContent className="flex h-full flex-col justify-between gap-1 p-0">
        <Link to={`/dashboard/folders/${id}`} className="text-base font-medium hover:underline">
          {name}
        </Link>
      </CardContent>

      {!isLoading && profile && (
        <CardFooter className="flex items-center gap-4 p-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{t('language')}</span>
            <div>{lang}</div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default RandomCard;
