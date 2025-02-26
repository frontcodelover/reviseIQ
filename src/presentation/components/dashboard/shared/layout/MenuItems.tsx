import { Folder, House, Settings, Trophy, Users } from 'lucide-react';
import { type ElementType } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  title: string;
  url: string;
  icon: ElementType;
}

interface MenuGroup {
  title: string;
  url: string;
  items: MenuItem[];
}

interface Menu {
  navMain: MenuGroup[];
}

export function MenuItems(): Menu {
  const { t } = useTranslation();

  const menuItems: Menu = {
    navMain: [
      {
        title: t('dashboard.navigation'),
        url: '/dashboard',
        items: [
          {
            title: t('dashboard.home'),
            url: '/dashboard',
            icon: House,
          },
          {
            title: t('dashboard.deck'),
            url: '/dashboard/folders',
            icon: Folder,
          },
          {
            title: t('dashboard.community'),
            url: '/dashboard/community',
            icon: Users,
          },
          {
            title: t('dashboard.top'),
            url: '/dashboard/top-ranked',
            icon: Trophy,
          },
          {
            title: 'Priority',
            url: '/dashboard/priority-review',
            icon: Trophy,
          },
          {
            title: t('dashboard.settings'),
            url: '/dashboard/profile',
            icon: Settings,
          },
        ],
      },
    ],
  };

  return menuItems;
}

export type { Menu, MenuGroup, MenuItem };
