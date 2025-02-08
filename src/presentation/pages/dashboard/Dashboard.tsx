import { useState } from 'react';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useAuth } from '@/presentation/context/AuthContext';
import ActivityCalendar from '@/presentation/components/dashboard/stats/activityCalendar';
import { LogsAndBadgesManager } from '@/presentation/components/dashboard/stats/logsAndBadgesManager';
import { GetLimitedPublicFolders } from '@/presentation/components/dashboard/homeBoard/GetLimitedPublicFolders';
import styled from 'styled-components';
import GetRandomFolder from '@/presentation/components/dashboard/homeBoard/GetRandomFolder';
import { useTranslation } from 'react-i18next';
import Greetings from '@/presentation/components/dashboard/homeBoard/Greetings';
import { Badge } from '@/domain/entities/Badge';
import HeadingTwo from '@/presentation/components/ui/text/heading/HeadingTwo';
import HeadingThree from '@/presentation/components/ui/text/heading/HeadingThree';
import Text from '@/presentation/components/ui/text/Text';
import { Box, Card, Sheet, Typography } from '@mui/joy';

function Dashboard() {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();
  const userId: string | null = user?.id ?? null;
  const [logs, setLogs] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<Badge[]>([]);
  const [lastBadge, setLastBadge] = useState<Badge | null>(null);
  const { t } = useTranslation();
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  return (
    <>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px', // ou utiliser la notation MUI : gap: 3
          minHeight: '100%',
          bgcolor: 'var(--joy-palette-background)',
        }}
      >
        <Greetings />

        <GetRandomFolder />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Typography level="h3" sx={{ color: 'primary' }}>
            {t('dashboard.lastPublicFolders')}
          </Typography>
          <GetLimitedPublicFolders />
        </Box>

        <LogsAndBadgesManager
          userId={userId}
          onLogsUpdate={setLogs}
          onBadgesUpdate={setBadges}
          onLastBadgeUpdate={setLastBadge}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Typography level="h3" sx={{ color: 'primary' }}>
            {t('dashboard.stats')}
          </Typography>

          <Box sx={{ display: 'flex', gap: '1.5rem' }}>
            <Card sx={{ flex: 1, padding: '1.5rem', bgcolor: 'primary.main', border: 'none' }}>
              <ActivityCalendar data={logs} />
            </Card>

            <Card sx={{ flex: 1, padding: '1.5rem', bgcolor: 'primary', border: 'none' }}>
              <MarginBottomContainer>
                <MarginBottomContainerSmall>
                  <Typography level="h4" fontSize={'1rem'}>
                    Dernier badge obtenu
                  </Typography>
                </MarginBottomContainerSmall>
                {lastBadge && (
                  <BadgeContainer key={lastBadge.id}>
                    <BadgeImage src={lastBadge.image_url} alt={lastBadge.name} />
                    <LeftMarginContainer>
                      <HeadingThree $weight="medium" $size="medium" color="black">
                        {lastBadge.name}
                      </HeadingThree>
                      <Text color="secondary" $size="medium" $weight="regular">
                        {lastBadge.description}
                      </Text>
                      <Text color="secondary" $size="small" $weight="light">
                        Obtenu le {new Date(lastBadge.obtained_at).toLocaleDateString()}
                      </Text>
                    </LeftMarginContainer>
                  </BadgeContainer>
                )}
              </MarginBottomContainer>
            </Card>
          </Box>
          <>
            <>
              <HeadingTwo $size="large" $weight="medium" color="black">
                Vos badges
              </HeadingTwo>
            </>
            <GridContainer>
              {badges.map((badge) => (
                <BadgeCard key={`badge-${badge.id}`}>
                  <BadgeImage src={badge.image_url} alt={badge.name} />
                  <HeadingThree $size="medium" $weight="medium" $align="center" color="black">
                    {badge.name}
                  </HeadingThree>
                  <Text $size="medium" $align="center" color="secondary">
                    {badge.description}
                  </Text>
                </BadgeCard>
              ))}
            </GridContainer>
          </>
        </Box>
      </Sheet>
    </>
  );
}

export default Dashboard;

const MarginBottomContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const MarginBottomContainerSmall = styled.div`
  margin-bottom: 1rem;
`;

const BadgeImage = styled.img`
  margin-bottom: 0.5rem;
  height: 4rem;
  width: 4rem;
  object-fit: contain;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BadgeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LeftMarginContainer = styled.div`
  margin-left: 1rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;

  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
