import styled from 'styled-components';
import { useEffect } from 'react';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useTranslation } from 'react-i18next';
import { useHandleSignOut } from '@/presentation/hooks/useSignOut';
import { SquareChevronLeft } from 'lucide-react';
import SidebarFooter from '@/presentation/components/dashboard/shared/SidebarFooter';
import SidebarMenuItem from '@/presentation/components/dashboard/shared/SidebarMenuItem';
import SidebarGroupLabel from '@/presentation/components/dashboard/shared/SidebarGroupLabel';
import SidebarMenuItemResponsive from '@/presentation/components/dashboard/shared/SidebarMenuItemResponsive';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { Item } from '@/presentation/components/dashboard/shared/Item';

const SIDEBAR_STATE_KEY = 'sidebar-collapsed-state';

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

  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return <div>Pas de profil</div>;

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(newState));
  };

  return (
    <>
      <StyledSidebarTwo $isCollapsed={isCollapsed}>
        <ToggleButton onClick={toggleSidebar} $isCollapsed={isCollapsed}>
          <SquareChevronLeft size={24} />
        </ToggleButton>
        <SidebarGroupLabel $isCollapsed={isCollapsed} />
        <ItemAlign>
          {items.map((item) =>
            isCollapsed ? (
              <SidebarMenuItem key={item.title} item={item} />
            ) : (
              <SidebarMenuItemResponsive key={item.title} item={item} />
            )
          )}
        </ItemAlign>
        <SidebarFooter handleSignOut={handleSignOut} t={t} $isCollapsed={isCollapsed} />
      </StyledSidebarTwo>
    </>
  );
}

export const StyledSidebarTwo = styled.aside<StyledProps>`
  background-color: ${COLORS.lightgray};
  min-height: 100vh;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '250px' : '55px')};
  position: fixed;
  transition: width 0.5s ease-in-out;
  top: 0;
  left: 0;
  border-right: 1px solid ${COLORS.gray};
  padding-top: 0;
  margin-top: 0px;
`;

export const ToggleButton = styled.button<StyledProps>`
  position: absolute;
  top: 1rem;
  right: 0.42rem;
  z-index: 1000;
  color: ${COLORS.secondary};
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${COLORS.black};
  }
  svg {
    transition: transform 0.2s ease-in-out;
    transform: ${({ $isCollapsed }) => ($isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

const ItemAlign = styled.div`
  display: flex;
  flex-direction: column;
`;
