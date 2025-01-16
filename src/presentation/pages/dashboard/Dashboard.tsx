import { useState } from 'react';
import { useProfile } from '@/presentation/components/dashboard/useProfile';
import { useAuth } from '@/presentation/context/AuthContext';
import ActivityCalendar from '@/presentation/components/dashboard/stats/activityCalendar';
import { LogsAndBadgesManager } from '@/presentation/components/dashboard/stats/logsAndBadgesManager';
import { GetPublicFolders } from '@/presentation/components/dashboard/community/GetPublicFolders';

import { Badge } from '@/domain/entities/Badge';

function Dashboard() {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();
  const userId: string | null = user?.id ?? null;
  const [logs, setLogs] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<Badge[]>([]);
  const [lastBadge, setLastBadge] = useState<Badge | null>(null);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bienvenue {profile.firstname}</h1>
      </div>

      <GetPublicFolders />

      <LogsAndBadgesManager
        userId={userId}
        onLogsUpdate={setLogs}
        onBadgesUpdate={setBadges}
        onLastBadgeUpdate={setLastBadge}
      />

      <div className="mt-6 flex flex-col gap-4">
        <h2 className="mb-4 text-xl font-bold">Statistiques</h2>
        <div className="flex gap-6 rounded-lg border bg-slate-50 p-6">
          <ActivityCalendar data={logs} />

          {lastBadge && (
            <div className="mb-6">
              <h2 className="mb-4 text-sm font-bold">Dernier badge obtenu</h2>
              <div className="flex items-center rounded-lg bg-white p-4 shadow" key={lastBadge.id}>
                <img
                  src={lastBadge.image_url}
                  alt={lastBadge.name}
                  className="h-16 w-16 object-contain"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{lastBadge.name}</h3>
                  <p className="text-sm text-gray-500">{lastBadge.description}</p>
                  <p className="text-xs text-gray-400">
                    Obtenu le {new Date(lastBadge.obtained_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">Vos badges</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={`badge-${badge.id}`}
                className="flex flex-col items-center rounded-lg bg-white p-4 shadow"
              >
                <img
                  src={badge.image_url}
                  alt={badge.name}
                  className="mb-2 h-16 w-16 object-contain"
                />
                <h3 className="text-center text-sm font-bold">{badge.name}</h3>
                <p className="text-center text-xs text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
