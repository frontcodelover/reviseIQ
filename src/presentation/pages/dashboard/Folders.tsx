import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import { useTranslation } from 'react-i18next';

function Folders() {
  const { t } = useTranslation();
  return (
    <>
      <HeadingOne size="xlarge" weight="bold" color="black">
        {t('dashboard.folder.yourfolder')} 📂{' '}
      </HeadingOne>
      <UserDecks />
    </>
  );
}

export default Folders;
