import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import { PageContainer } from '@/presentation/shared/PageContainer';
import { useTranslations } from 'next-intl';
export default function Folders() {
  const t = useTranslations();

  return (
    <PageContainer>
      <h1 className='mb-6 truncate text-3xl font-semibold text-foreground'>{t('dashboard.folder.yourfolder')}</h1>
      <UserDecks />
    </PageContainer>
  );
}
