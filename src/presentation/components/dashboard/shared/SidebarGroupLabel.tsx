// presentation/components/dashboard/shared/SidebarGroupLabel.tsx
import styled from 'styled-components';

const StyledSidebarGroupLabel = styled.div`
  margin: 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  padding: 0 1rem;
`;

const SidebarGroupLabel = () => {
  return (
    <StyledSidebarGroupLabel>
      <span style={{ color: '#0077FF' }}>Revise</span>
      <span style={{ color: '#0077FF' }}>IQ</span>
    </StyledSidebarGroupLabel>
  );
};

export default SidebarGroupLabel;
