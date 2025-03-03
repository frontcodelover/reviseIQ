import ListPublicFolders from '@/presentation/components/dashboard/community/ListPublicFolders';
import { PageContainer } from '@/presentation/shared/PageContainer';
import { useTranslations } from 'next-intl';

export default function Community() {
  const t = useTranslations();

  return (
    <PageContainer>
      <h1 className='text-3xl font-semibold text-foreground'>{t('dashboard.community')}</h1>
      <ListPublicFolders />
    </PageContainer>
  );
}
