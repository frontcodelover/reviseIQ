import styled from 'styled-components';
import { LogOut } from 'lucide-react';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

interface SidebarFooterProps {
  handleSignOut: () => void;
  t: (key: string) => string;
  $isCollapsed: boolean;
}

interface SidebarFooterProps {
  handleSignOut: () => void;
  t: (key: string) => string;
  $isCollapsed: boolean;
}

const SidebarFooter = ({ handleSignOut, t, $isCollapsed }: SidebarFooterProps) => {
  return (
    <StyledSidebarFooter $isCollapsed={$isCollapsed}>
      <LogoutBtn onClick={handleSignOut}>
        <LogOut />
        {t('signout')}
      </LogoutBtn>
    </StyledSidebarFooter>
  );
};

const StyledSidebarFooter = styled.div<{ $isCollapsed: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? '1' : '0')};
  visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in-out;
`;

const LogoutBtn = styled.button`
  background-color: ${COLORS.lightgray};
  color: ${COLORS.danger};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
  gap: 0.75rem;
  width: 100%;
`;
export default SidebarFooter;
