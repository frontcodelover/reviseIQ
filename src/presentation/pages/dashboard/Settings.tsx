import { Profile } from '@/presentation/components/dashboard/profile/Profile';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div className="flex w-auto flex-col space-y-6">
      <h1 className="truncate text-3xl font-semibold text-foreground">{t('dashboard.profile')}</h1>

      <Profile />
    </div>
  );
}
