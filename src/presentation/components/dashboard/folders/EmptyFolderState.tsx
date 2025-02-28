import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EmptyFolderState() {
  const { t } = useTranslation();

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{t('dashboard.folder.empty')}</AlertTitle>
      <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
    </Alert>
  );
}
