import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import { useTranslation } from 'react-i18next';

export default function Folders() {
  const { t } = useTranslation();

  return (
    <div className="flex w-auto flex-col space-y-6">
      <h1 className="truncate text-3xl font-semibold text-foreground">
        {t('dashboard.folder.yourfolder')}
      </h1>
      <UserDecks />
    </div>
  );
}
