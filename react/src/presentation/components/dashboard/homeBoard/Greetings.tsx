import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useProfile } from '@/presentation/hooks/useProfile';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Greetings() {
  const { profile, loading, error } = useProfile();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="space-y-3 py-4">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!profile) return null;

  return (
    <div className="mb-6 flex w-full flex-col space-y-2 rounded-xl">
      <h1 className="truncate text-4xl font-semibold text-foreground">
        {t('dashboard.greetings')} {profile.firstname} 👋
      </h1>
      <div className="space-y-1">
        <p className="text-lg text-muted-foreground">{t('dashboard.greetings2')}</p>
      </div>
    </div>
  );
}

export default Greetings;
