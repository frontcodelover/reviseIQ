import styled from 'styled-components';
import { LogOut } from 'lucide-react';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

const StyledSidebarFooter = styled.div`
  padding: 1rem;
`;

const LogoutBtn = styled.button`
  background-color: ${COLORS.lightgray};
  padding: 20px 10px;
  color: ${COLORS.danger};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
  gap: 0.75rem;
`;

interface SidebarFooterProps {
  handleSignOut: () => void;
  t: (key: string) => string;
}

const SidebarFooter = ({ handleSignOut, t }: SidebarFooterProps) => {
  return (
    <StyledSidebarFooter>
      <LogoutBtn onClick={handleSignOut}>
        <LogOut />

        {t('signout')}
      </LogoutBtn>
    </StyledSidebarFooter>
  );
};

export default SidebarFooter;
