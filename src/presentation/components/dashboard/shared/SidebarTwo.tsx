import styled from 'styled-components';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useTranslation } from 'react-i18next';
import { useHandleSignOut } from '@/presentation/hooks/useSignOut';
import { AlignJustify } from 'lucide-react';
import SidebarFooter from '@/presentation/components/dashboard/shared/SidebarFooter';
import SidebarMenuItem from '@/presentation/components/dashboard/shared/SidebarMenuItem';
import SidebarGroupLabel from '@/presentation/components/dashboard/shared/SidebarGroupLabel';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { Item } from '@/presentation/components/dashboard/shared/Item';

export const SIDEBAR_STATE_KEY = 'sidebar-collapsed-state';

interface SidebarTwoProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

interface StyledProps {
  $isCollapsed: boolean;
}

export function SidebarTwo({ isCollapsed, setIsCollapsed }: SidebarTwoProps) {
  const { t } = useTranslation();
  const { profile, loading, error } = useProfile();
  const items = Item();
  const handleSignOut = useHandleSignOut();

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(newState));
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return <div>Pas de profil</div>;

  return (
    <>
      <StyledSidebarTwo $isCollapsed={isCollapsed}>
        <ToggleButton onClick={toggleSidebar} $isCollapsed={isCollapsed}>
          <AlignJustify />
        </ToggleButton>
        <SidebarGroupLabel $isCollapsed={isCollapsed} />
        <ItemAlign $isCollapsed={isCollapsed}>
          {items.map((item) => isCollapsed && <SidebarMenuItem key={item.title} item={item} />)}
        </ItemAlign>
        <SidebarFooter handleSignOut={handleSignOut} t={t} $isCollapsed={isCollapsed} />
      </StyledSidebarTwo>
    </>
  );
}

const StyledSidebarTwo = styled.aside<StyledProps>`
  background-color: ${COLORS.lightgray};
  min-height: 100vh;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '250px' : '0')};
  position: fixed;
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;
  z-index: 100;
  border-right: 1px solid ${COLORS.gray};

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    `
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  `}
`;

export const ToggleButton = styled.button<StyledProps>`
  position: absolute;
  top: 1rem;
  left: ${({ $isCollapsed }) => ($isCollapsed ? '200px' : '0.40rem')};
  z-index: 1000;
  color: ${COLORS.secondary};
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${COLORS.black};
  }
`;

const ItemAlign = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;
  visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'visible' : 'hidden')};
`;
