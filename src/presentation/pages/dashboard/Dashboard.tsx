import { useState } from 'react';
import { useProfile } from '@/presentation/components/dashboard/useProfile';
import { useAuth } from '@/presentation/context/AuthContext';
import ActivityCalendar from '@/presentation/components/dashboard/stats/activityCalendar';
import { LogsAndBadgesManager } from '@/presentation/components/dashboard/stats/logsAndBadgesManager';
import { GetPublicFolders } from '@/presentation/components/dashboard/community/GetPublicFolders';
import styled from 'styled-components';
import DashboardCard from '@/presentation/components/dashboard/DashboardCard';

import { Badge } from '@/domain/entities/Badge';
import HeadingTwo from '@/presentation/components/ui/text/heading/HeadingTwo';
import HeadingThree from '@/presentation/components/ui/text/heading/HeadingThree';
import Text from '@/presentation/components/ui/text/Text';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';

const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #0077ff;
  padding: 3rem;
  border-radius: 16px;
  margin: 2rem 0;
  gap: 1.5rem;
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FlexContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
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
  background-color: white;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 1.5rem;
`;

const DashcardCardLayout = styled.section`
  display: flex;
  gap: 1rem;
`;

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

  const cardDashboard = [
    {
      title: 'Découvrir',
      description: 'Tableau de bord personnalisé',
    },
    {
      title: 'Explorez',
      description: 'Vos statistiques de progression',
    },
    {
      title: 'Communauté',
      description: 'Apprenez et gagnez des badges',
    },
    {
      title: 'Activité récente',
      description: 'Partagez avec la communauté',
    },
  ];

  return (
    <Container>
      <GreetingsContainer>
        <HeadingOne size="xxlarge" color="white" weight="bold">
          Bienvenue {profile.firstname} 👋
        </HeadingOne>
        <ParagraphContainer>
          <Text size="medium" color="white" weight="light">
            Commencez à explorer votre tableau de bord et apprendre de nouvelles compétences.
          </Text>
          <Text size="medium" color="white" weight="light">
            Plus vous vous exercerez, plus vous obtiendrez de badges.
          </Text>
          <Text size="medium" color="white" weight="medium">
            Envie de relever le défi ?
          </Text>
        </ParagraphContainer>
      </GreetingsContainer>
      <DashcardCardLayout>
        {cardDashboard.map((card, index) => (
          <DashboardCard key={index} title={card.title} description={card.description} />
        ))}
      </DashcardCardLayout>

      <GetPublicFolders />

      <LogsAndBadgesManager
        userId={userId}
        onLogsUpdate={setLogs}
        onBadgesUpdate={setBadges}
        onLastBadgeUpdate={setLastBadge}
      />

      <FlexContainer>
        <HeadingTwo size="large" weight="medium" color="black">
          Statistiques
        </HeadingTwo>
        <StatsContainer>
          <ActivityCalendar data={logs} />

          {lastBadge && (
            <MarginBottomContainer>
              <MarginBottomContainerSmall>
                <HeadingTwo size="medium" weight="medium" color="black">
                  Dernier badge obtenu
                </HeadingTwo>
              </MarginBottomContainerSmall>
              <BadgeContainer key={lastBadge.id}>
                <BadgeImage src={lastBadge.image_url} alt={lastBadge.name} />
                <LeftMarginContainer>
                  <HeadingThree weight="medium" size="medium" color="black">
                    {lastBadge.name}
                  </HeadingThree>
                  <Text color="secondary" size="medium" weight="regular">
                    {lastBadge.description}
                  </Text>
                  <Text color="secondary" size="small" weight="light">
                    Obtenu le {new Date(lastBadge.obtained_at).toLocaleDateString()}
                  </Text>
                </LeftMarginContainer>
              </BadgeContainer>
            </MarginBottomContainer>
          )}
        </StatsContainer>
        <>
          <>
            <HeadingTwo size="large" weight="medium" color="black">
              Vos badges
            </HeadingTwo>
          </>
          <GridContainer>
            {badges.map((badge) => (
              <BadgeCard key={`badge-${badge.id}`}>
                <BadgeImage src={badge.image_url} alt={badge.name} />
                <HeadingThree size="medium" weight="medium" align="center" color="black">
                  {badge.name}
                </HeadingThree>
                <Text size="medium" align="center" color="secondary">
                  {badge.description}
                </Text>
              </BadgeCard>
            ))}
          </GridContainer>
        </>
      </FlexContainer>
    </Container>
  );
}

export default Dashboard;
