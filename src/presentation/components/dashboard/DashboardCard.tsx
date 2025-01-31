import styled from 'styled-components';
import HeadingThree from '@/presentation/components/ui/text/heading/HeadingThree';
import Text from '@/presentation/components/ui/text/Text';

const Box = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

interface DashboardCardProps {
  title: string;
  description: string;
}

function DashboardCard({ title, description }: DashboardCardProps) {
  return (
    <Box>
      <HeadingThree weight="medium" size="regular" color="black">
        {title}
      </HeadingThree>
      <Text weight="regular" size="regular" color="secondary">
        {description}
      </Text>
    </Box>
  );
}

export default DashboardCard;
