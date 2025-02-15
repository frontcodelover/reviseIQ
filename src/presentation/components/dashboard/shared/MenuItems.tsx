import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useTranslation } from 'react-i18next';

export function MenuItems() {
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('dashboard.home'),
      url: '/dashboard',
      icon: HomeRoundedIcon,
    },
    {
      title: t('dashboard.deck'),
      url: '/dashboard/folders',
      icon: DashboardRoundedIcon,
    },
    {
      title: t('dashboard.community'),
      url: '/dashboard/community',
      icon: GroupRoundedIcon,
    },
    {
      title: t('dashboard.settings'),
      url: '/dashboard/profile',
      icon: SettingsRoundedIcon,
    },
  ];
  return menuItems;
}
