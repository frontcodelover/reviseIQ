import { cn } from '@/lib/utils';
import { MenuItems } from '@/presentation/components/dashboard/shared/layout/MenuItems';
import Notification from '@/presentation/components/dashboard/shared/layout/Notification';
import { SearchForm } from '@/presentation/components/dashboard/shared/layout/Search.form';
import { SidebarFooter } from '@/presentation/components/dashboard/shared/layout/SidebarFooter';
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
} from '@/presentation/components/ui/sidebar';
import { ModeToggle } from '@/presentation/shared/ModeToggle';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const location = useLocation();
  const menu = MenuItems();

  const isItemActive = (itemUrl: string) => {
    // Pour les URLs exactes comme /dashboard
    if (itemUrl === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    // Pour les URLs avec des sous-routes comme /dashboard/folders
    return location.pathname.startsWith(itemUrl) && itemUrl !== '/dashboard';
  };

  return (
    <Sidebar
      className={cn(
        // Ajouter un fond d'écran explicite qui fonctionnera en mode mobile et desktop
        'bg-background dark:bg-background',
        className
      )}
      {...props}
    >
      <SidebarHeader className="bg-background dark:bg-background">
        <SidebarMenu>
          <div className="p-2">
            <SidebarMenuItem>
              <div className="flex items-center justify-between gap-0.5 leading-none">
                <span className="font-bold text-primary">{t('title')}</span>
                <span className="flex items-center gap-2">
                  <Notification />
                  <ModeToggle />
                </span>
              </div>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent className="bg-background dark:bg-background">
        {menu.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = isItemActive(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          'flex items-center gap-2 rounded-md p-2',
                          'transition-colors duration-200',
                          'hover:bg-primary/20',
                          isActive && 'font-medium text-primary'
                        )}
                      >
                        <Link to={item.url}>
                          {item.icon && (
                            <item.icon
                              className={cn(
                                'h-4 w-4',
                                isActive ? 'text-primary' : 'text-muted-foreground'
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              'text-sm',
                              isActive ? 'text-primary' : 'text-muted-foreground'
                            )}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="bg-background p-2 dark:bg-background">
        <SidebarFooter />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
