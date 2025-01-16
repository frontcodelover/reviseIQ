import { GetPublicFolders } from '@/presentation/components/dashboard/community/GetPublicFolders';
import { useTranslation } from 'react-i18next';

function Community() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{t('dashboard.community')}</h1>
      <GetPublicFolders />
    </div>
  );
}

export default Community;
