// presentation/components/dashboard/shared/Sidebar.tsx
import styled from 'styled-components';
import SidebarContent from '@/presentation/components/dashboard/shared/SidebarContent';
import SidebarFooter from '@/presentation/components/dashboard/shared/SidebarFooter';
import { useTranslation } from 'react-i18next';
import { useHandleSignOut } from '@/presentation/hooks/useSignOut';
import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';
import { useProfile } from '@/presentation/components/dashboard/useProfile';
import { Calendar, Home, Inbox, MessageCircleHeart } from 'lucide-react';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.lightgray};
  height: 100%;
  transition: width 0.5s ease-in-out;
  overflow: hidden auto;
  border-radius: 0 2rem 2rem 0;
`;
const Sidebar = () => {
  const { t } = useTranslation();
  const handleSignOut = useHandleSignOut();
  const { deckCount } = useUserDecksCount();
  const { profile, loading, error } = useProfile();

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

  return (
    <StyledSidebar>
      <SidebarContent items={items} />
      <SidebarFooter handleSignOut={handleSignOut} t={t} />
    </StyledSidebar>
  );
};

export default Sidebar;
