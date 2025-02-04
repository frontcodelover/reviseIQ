import React from 'react';
import styled from 'styled-components';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';
import { useProfile } from '@/presentation/hooks/useProfile';
import { Calendar, Home, Inbox, MessageCircleHeart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHandleSignOut } from '@/presentation/hooks/useSignOut';
import SidebarFooter from './SidebarFooter';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarGroupLabel from './SidebarGroupLabel';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { SquareChevronLeft } from 'lucide-react';
import SidebarMenuItemResponsive from './SidebarMenuItemResponsive';

export function SidebarTwo({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const { t } = useTranslation();
  const { profile, loading, error } = useProfile();
  const { deckCount } = useUserDecksCount();
  const handleSignOut = useHandleSignOut();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return <div>Pas de profil</div>;

  const items: SidebarItem[] = [
    {
      title: t('dashboard.home'),
      url: '/dashboard',
      icon: Home,
    },
    {
      title: t('dashboard.deck'),
      url: '/dashboard/folders',
      icon: Inbox,
      nb: deckCount,
      color: '#ff0080',
    },
    {
      title: t('dashboard.community'),
      url: '/dashboard/community',
      icon: MessageCircleHeart,
      nb: '+99',
      color: '#00bcd4',
    },
    {
      title: t('dashboard.calendar'),
      url: '#',
      icon: Calendar,
    },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {isCollapsed ? (
        <StyledSidebarTwo isCollapsed={isCollapsed}>
          <>
            <ToggleButton onClick={toggleSidebar} isSidebarVisible={isCollapsed}>
              <SquareChevronLeft size={24} />
            </ToggleButton>
            <SidebarGroupLabel isCollapsed={isCollapsed} />
            <ItemAlign>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} item={item} />
              ))}
            </ItemAlign>
          </>
          <SidebarFooter handleSignOut={handleSignOut} t={t} isCollapsed={isCollapsed} />
        </StyledSidebarTwo>
      ) : (
        <StyledSidebarTwo isCollapsed={isCollapsed}>
          <>
            <ToggleButton onClick={toggleSidebar} isSidebarVisible={isCollapsed}>
              <SquareChevronLeft size={24} />
            </ToggleButton>
            <SidebarGroupLabel isCollapsed={isCollapsed} />
            <ItemAlign>
              {items.map((item) => (
                <SidebarMenuItemResponsive key={item.title} item={item} />
              ))}
            </ItemAlign>
          </>
          <SidebarFooter handleSignOut={handleSignOut} t={t} isCollapsed={isCollapsed} />
        </StyledSidebarTwo>
      )}
    </>
  );
}

const StyledSidebarTwo = styled.aside<{ isCollapsed: boolean }>`
  background-color: ${COLORS.lightgray};
  min-height: 100vh;
  width: ${({ isCollapsed }) => (isCollapsed ? '250px' : '55px')};
  position: fixed;
  transition: width 0.5s ease-in-out;
  top: 0;
  left: 0;
  border-right: 1px solid ${COLORS.gray};
  padding-top: 0;
  margin-top: 0px;
`;

const ToggleButton = styled.button<{ isSidebarVisible: boolean }>`
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
    transform: ${({ isSidebarVisible }) => (isSidebarVisible ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

const ItemAlign = styled.div`
  display: flex;
  flex-direction: column;
`;
