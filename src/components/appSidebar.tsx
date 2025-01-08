import clsx from 'clsx';
import {
  Calendar,
  Home,
  Inbox,
  MessageCircleHeart,
  Search,
  ChevronUp,
  User2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHandleSignOut } from '@/hooks/useSignOut';
import { useUserDecksCount } from '@/hooks/useUserDecksCount';
import { useProfile } from '@/hooks/useProfile';

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const handleSignOut = useHandleSignOut();
  const deckCount = useUserDecksCount();
  const { profile, loading, error } = useProfile();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return <div>Pas de profil</div>;

  const items = [
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
      color: 'bg-green-700',
    },
    {
      title: t('dashboard.community'),
      url: '/dashboard/community',
      icon: MessageCircleHeart,
      nb: '+99',
      color: 'bg-slate-700',
    },
    {
      title: t('dashboard.search'),
      url: '#',
      icon: Search,
    },
    {
      title: t('dashboard.calendar'),
      url: '#',
      icon: Calendar,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent className="bg-slate-800">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 text-base font-bold text-slate-100">
            {t('title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="text-slate-400">
                    <SidebarMenuButton asChild>
                      {isActive ? (
                        <div
                          key={item.title}
                          className="font-bold text-slate-100 hover:bg-none"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          {item.nb && (
                            <span
                              className={clsx(
                                'ml-auto rounded-lg px-3 py-1 text-xs text-slate-100',
                                `${item.color}`
                              )}
                            >
                              {item.nb}
                            </span>
                          )}
                        </div>
                      ) : (
                        <NavLink to={item.url} key={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.nb && (
                            <span
                              className={clsx(
                                'ml-auto rounded-lg px-3 py-1 text-xs text-slate-100',
                                `${item.color}`
                              )}
                            >
                              {item.nb}
                            </span>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-slate-800">
        <SidebarMenu className="mb-2 rounded-lg border-b border-slate-700 bg-slate-600 p-2 text-slate-300 shadow-xl">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-slate-300 hover:bg-slate-600 hover:text-slate-100">
                  <User2 />{' '}
                  <span className="... truncate">{profile?.firstname}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link to="/dashboard/settings">
                    <span>{t('dashboard.account')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{t('dashboard.billing')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-500"
                  >
                    {t('signout')}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
