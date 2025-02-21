import ListPublicFolders from '@/presentation/components/dashboard/community/ListPublicFolders';
import { useTranslation } from 'react-i18next';

export default function Community() {
  const { t } = useTranslation();

  return (
    <div className="m-4 flex w-auto flex-col space-y-6">
      <h1 className="truncate text-3xl font-semibold text-foreground">
        {t('dashboard.community')}
      </h1>
      <ListPublicFolders />
    </div>
  );
}
