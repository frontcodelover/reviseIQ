import { appContainer } from '@/infrastructure/config/AppContainer';
import { CardFolderRank } from '@/presentation/components/dashboard/rank/CardFolderRank';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

export function ListMostLikedFolders() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery('mostLikedFolders', async () => {
    const result = await appContainer.getFolderService().getMostLikedFolders();
    return result;
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-full space-y-4 overflow-x-auto">
        <Spinner className="h-8 w-8 text-black dark:text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100">
        <AlertDescription>{t('errors.somethingWentWrong')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        {t('dashboard.folder.mostLikedFolders')}
      </h2>
      <div className="grid w-auto gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((folder) => <CardFolderRank key={folder.id} {...folder} />)}
      </div>
    </div>
  );
}
