import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EmptyFolderState() {
  const { t } = useTranslation();

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Ooops</AlertTitle>
      <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
    </Alert>
  );
}
