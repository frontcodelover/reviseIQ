import { Profile } from '@/presentation/components/dashboard/profile/Profile';
import { PageContainer } from '@/presentation/shared/PageContainer';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <h1 className="truncate text-3xl font-semibold text-foreground">{t('dashboard.profile')}</h1>
      <Profile />
    </PageContainer>
  );
}
