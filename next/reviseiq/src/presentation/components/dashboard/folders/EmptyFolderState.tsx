import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function EmptyFolderState() {
  const t  = useTranslations();

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Ooops</AlertTitle>
      <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
    </Alert>
  );
}
