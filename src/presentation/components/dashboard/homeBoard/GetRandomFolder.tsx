import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { RandomCard } from '@/presentation/components/dashboard/folders/RandomCard';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

export function GetRandomFolder() {
  const { t } = useTranslation();
  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('randomPublicFolder', () =>
    appContainer.getFolderService().getRandomPublicFolders()
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
        <AlertDescription>{t('dahsboard.noPublicFolder')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">{t('dashboard.folderDay')}</CardTitle>
        <p className="text-primary-foreground/90">{t('dashboard.folderDayText')}</p>
      </CardHeader>

      <CardContent className="grid gap-4">
        {folders.map((folder) => (
          <RandomCard key={folder.id} {...folder} />
        ))}
      </CardContent>
    </Card>
  );
}
