import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { CardFolder } from '@/presentation/components/dashboard/folders/CardFolder';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function ListHomeFolders() {
  const { t } = useTranslation();

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('lastPublicFolders', () =>
    appContainer.getFolderService().getLastPublicFolders()
  );

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }

  if (!folders?.length) {
    return (
      <Alert>
        <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {folders.map((folder) => (
          <CardFolder key={folder.id} {...folder} />
        ))}
      </div>

      <Link to="/dashboard/community" className="text-right text-primary hover:underline">
        + {t('dashboard.folder.moreFolder')}
      </Link>
    </div>
  );
}
