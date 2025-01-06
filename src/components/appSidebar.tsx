import {
  Calendar,
  Home,
  Inbox,
  MessageCircleHeart,
  Search,
  ChevronUp,
  User2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
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
import { useAuth } from '@/context/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';

export function AppSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const items = [
    {
      title: t('dashboard.home'),
      url: '/dashboard',
      icon: Home,
    },
    {
      title: t('dashboard.deck'),
      url: '#',
      icon: Inbox,
    },
    {
      title: t('dashboard.community'),
      url: '#',
      icon: MessageCircleHeart,
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader></SidebarHeader>
          <SidebarGroupLabel className="text-base font-bold text-primary">
            {t('title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                console.log(isActive);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {isActive ? (
                        <div key={item.title} className='font-bold hover:bg-none'>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      ) : (
                        <NavLink to={item.url} key={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                        </NavLink>
                      )}
                      {/* <NavLink to={item.url} {isActive ? 'active' : 'disabled'}>
                    </NavLink> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>{t('dashboard.account')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{t('dashboard.billing')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{t('signout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
