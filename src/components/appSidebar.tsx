import clsx from 'clsx';
import {
  Calendar,
  Home,
  Inbox,
  MessageCircleHeart,
  Search,
  ChevronUp,
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
  const { deckCount } = useUserDecksCount();
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
      color: 'bg-pink-600',
    },
    {
      title: t('dashboard.community'),
      url: '/dashboard/community',
      icon: MessageCircleHeart,
      nb: '+99',
      color: 'bg-cyan-600',
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
      <SidebarContent className="bg-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel className="my-6 text-2xl font-semibold tracking-tighter">
            <span className="text-sky-950">Revise</span>
            <span className="text-sky-500">IQ</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="text-gray-500">
                    <SidebarMenuButton asChild>
                      {isActive ? (
                        <div
                          key={item.title}
                          className="text-gray-900 hover:bg-gray-50"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-3">
                              <item.icon />
                              <span className="truncate text-sm tracking-tight">
                                {item.title}
                              </span>
                            </div>
                            <div>
                              {item.nb && (
                                <span
                                  className={clsx(
                                    'font-normal!important ml-auto rounded-lg px-3 py-1 text-xs text-gray-100',
                                    `${item.color}`
                                  )}
                                >
                                  {item.nb}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          to={item.url}
                          key={item.title}
                          className="hover:bg-gray-100"
                        >
                          <div className="flex w-full items-center justify-between py-4">
                            <div className="flex items-center gap-3">
                              <item.icon />
                              <span className="truncate text-sm tracking-tight">
                                {item.title}
                              </span>
                            </div>
                            <div>
                              {item.nb && (
                                <span
                                  className={clsx(
                                    'font-normal!important ml-auto rounded-lg px-3 py-1 text-xs text-gray-100',
                                    `${item.color}`
                                  )}
                                >
                                  {item.nb}
                                </span>
                              )}
                            </div>
                          </div>
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
      <SidebarFooter className="bg-gray-50">
        <SidebarMenu className="border-t border-gray-50 p-2 text-gray-800">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto text-gray-800 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900">
                  <img
                    src={`/src/assets/${profile.avatar}.webp`}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="... truncate text-lg font-semibold tracking-tight text-gray-600">
                    {profile?.firstname}
                  </span>
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
