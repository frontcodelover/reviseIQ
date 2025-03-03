import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { RandomCard } from '@/presentation/components/dashboard/homeBoard/RandomCard';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

export function GetRandomFolder() {
  const t  = useTranslations();
  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>({
    queryKey: ['randomPublicFolder'],
    queryFn: () => appContainer.getFolderService().getRandomPublicFolders()
  });

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
