import UserDecks from '@/components/dashboard/folders/userDecks';
import { useTranslation } from 'react-i18next';

function Folders() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        {t('dashboard.folder.yourfolder')}
      </h1>
      <UserDecks />
    </>
  );
}

export default Folders;
