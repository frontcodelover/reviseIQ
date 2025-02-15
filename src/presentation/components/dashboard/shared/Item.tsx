import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { Home, Folders, MessageCircleHeart, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      icon: Folders,
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
