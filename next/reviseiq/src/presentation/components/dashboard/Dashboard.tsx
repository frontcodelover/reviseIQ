//! need refactoring
import { Badge } from '@/domain/entities/Badge';
import { GetRandomFolder } from '@/presentation/components/dashboard/homeBoard/GetRandomFolder';
import { Greetings } from '@/presentation/components/dashboard/homeBoard/Greetings';
import { ListHomeFolders } from '@/presentation/components/dashboard/homeBoard/ListHomeFolders';
import ActivityCalendar from '@/presentation/components/dashboard/stats/ActivityPlanning';
import { LogsAndBadgesManager } from '@/presentation/components/dashboard/stats/logsAndBadgesManager';
import { Card, CardContent, CardTitle } from '@/presentation/components/ui/card';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useAuth } from '@/presentation/context/AuthContext';
import { useProfile } from '@/presentation/hooks/useProfile';
import { PageContainer } from '@/presentation/shared/PageContainer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function Dashboard() {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [logs, setLogs] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<Badge[]>([]);
  const [lastBadge, setLastBadge] = useState<Badge | null>(null);
  const t = useTranslations();

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">{error}</div>
    );
  }

  if (!profile) return null;

  return (
    <PageContainer>
      <Greetings />

      <GetRandomFolder />

      <ListHomeFolders />

      <LogsAndBadgesManager
        userId={userId}
        onLogsUpdate={setLogs}
        onBadgesUpdate={setBadges}
        onLastBadgeUpdate={setLastBadge}
      />

      <section className="mt-6 space-y-4">
        <h3 className="text-2xl font-semibold">{t('dashboard.stats')}</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="text-primary-foreground">
            <CardContent className="p-6">
              <ActivityCalendar data={logs} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Dernier badge obtenu</h4>
                {lastBadge && (
                  <div className="flex items-center space-x-4 rounded-lg bg-white/10 p-4">
                    <img
                      src={lastBadge.image_url}
                      alt={lastBadge.name}
                      className="h-16 w-16 object-contain"
                    />
                    <div className="space-y-1">
                      <h5 className="font-medium">{lastBadge.name}</h5>
                      <p className="text-sm opacity-90">{lastBadge.description}</p>
                      <p className="text-xs opacity-75">
                        Obtenu le {new Date(lastBadge.obtained_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Vos badges</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <Card key={badge.id}>
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <img src={badge.image_url} alt={badge.name} className="h-16 w-16 object-contain" />
                <CardTitle className="text-center">{badge.name}</CardTitle>
                <p className="text-center text-sm text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default Dashboard;
