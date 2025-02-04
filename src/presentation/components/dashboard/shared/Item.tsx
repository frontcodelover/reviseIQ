import { useTranslation } from 'react-i18next';
import { Home, Inbox, MessageCircleHeart, Calendar } from 'lucide-react';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';

export function Item() {
  const { t } = useTranslation();
  const { deckCount } = useUserDecksCount();

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
  return items;
}
