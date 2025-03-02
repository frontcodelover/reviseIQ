import ListPublicFolders from '@/presentation/components/dashboard/community/ListPublicFolders';
import { PageContainer } from '@/presentation/shared/PageContainer';
import { useTranslation } from 'react-i18next';

export default function Community() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-foreground">{t('dashboard.community')}</h1>
      <ListPublicFolders />
    </PageContainer>
  );
}
