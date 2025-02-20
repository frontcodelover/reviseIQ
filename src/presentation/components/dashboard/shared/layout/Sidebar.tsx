import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { MenuItems } from '@/presentation/components/dashboard/shared/layout/MenuItems';
import Notification from '@/presentation/components/dashboard/shared/layout/Notification';
import { SearchForm } from '@/presentation/components/dashboard/shared/layout/Search.form';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { SidebarFooter } from './SidebarFooter';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const location = useLocation();
  const menu = MenuItems();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="p-2">
            <SidebarMenuItem>
              <div className="flex items-center justify-between gap-0.5 leading-none">
                <span className="font-semibold">{t('title')}</span>
                <Notification />
              </div>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {menu.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        {item.icon && <item.icon />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
