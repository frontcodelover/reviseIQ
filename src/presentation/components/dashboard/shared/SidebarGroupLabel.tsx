// presentation/components/dashboard/shared/SidebarGroupLabel.tsx
import styled from 'styled-components';
import { Brain } from 'lucide-react';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

interface SidebarGroupLabelProps {
  isCollapsed: boolean;
}

const SidebarGroupLabel = ({ isCollapsed }: SidebarGroupLabelProps) => {
  return (
    <StyledSidebarGroupLabel>
      {!isCollapsed ? (
        <StyledBrain />
      ) : (
        <>
          <StyledBrain />
          <TitleSpan>ReviseIQ</TitleSpan>
        </>
      )}
    </StyledSidebarGroupLabel>
  );
};

const StyledSidebarGroupLabel = styled.div`
  margin: 4rem 0 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 3rem;
  transition: all 0.3s ease-in-out;
`;

const StyledBrain = styled(Brain)`
  color: ${COLORS.pinky};
  width: 1.5rem !important;
  height: 1.5rem !important;
`;

const TitleSpan = styled.h1`
  color: ${COLORS.primary};
`;

export default SidebarGroupLabel;
