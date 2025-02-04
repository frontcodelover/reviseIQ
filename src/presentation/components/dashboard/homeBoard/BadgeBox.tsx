import LogsAndBadgesManager from '../stats/logsAndBadgesManager';
import { useAuth } from '../../../context/AuthContext';
import { Badge } from '../../../../domain/entities/Badge';
import { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../ui/colors/ColorsVariant';
import HeadingThree from '../../ui/text/heading/HeadingThree';
import Text from '../../ui/text/Text';
import { formatDate } from '@/lib/FormatDate';
import { CupSoda } from 'lucide-react';
import HeadingTwo from '../../ui/text/heading/HeadingTwo';

const BadgeBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 94%;
  gap: 1rem;
  background-color: ${COLORS.lightBlue};
  border: 1px solid ${COLORS.secondaryBlue};
  border-radius: 10px;
  padding: 25px;
`;

const BadgBoxPlacement = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
`;

const BadgeImage = styled.div`
  border-radius: 50%;
  background-color: ${COLORS.secondaryBlue};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    fill: ${COLORS.secondaryBlue};
    stroke: ${COLORS.white};
  }
`;

function BadgeBox() {
  const { user } = useAuth();
  const userId: string | null = user?.id ?? null;
  const [logs, setLogs] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<Badge[]>([]);
  const [lastBadge, setLastBadge] = useState<Badge | null>(null);

  console.log(badges);
  return (
    <>
      <LogsAndBadgesManager
        userId={userId}
        onLogsUpdate={setLogs}
        onBadgesUpdate={setBadges}
        onLastBadgeUpdate={setLastBadge}
      />

      <BadgeBoxContainer>
        <HeadingTwo size="medium" weight="semibold">
          Vos badges
        </HeadingTwo>
        {badges.map((badge) => (
          <BadgBoxPlacement key={badge.id}>
            <BadgeImage>
              <CupSoda />
            </BadgeImage>
            <div>
              <HeadingThree color="black">{badge.name}</HeadingThree>
              <Text color="black" size="small" weight="regular">
                {badge.description}
              </Text>
              <Text color="secondary" size="small" weight="regular">
                {formatDate(badge.obtained_at)}
              </Text>
            </div>
          </BadgBoxPlacement>
        ))}
      </BadgeBoxContainer>
    </>
  );
}

export default BadgeBox;
