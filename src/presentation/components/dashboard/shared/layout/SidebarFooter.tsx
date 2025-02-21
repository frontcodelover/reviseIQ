import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useProfile } from '@/presentation/hooks/useProfile';
import { useHandleSignOut } from '@/presentation/hooks/useSignOut';
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SidebarFooter() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const handleSignOut = useHandleSignOut();
  const { profile } = useProfile();

  const handleSettingsClick = () => {
    navigate('/dashboard/profile');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={profile?.avatar} alt={profile?.firstname} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{profile?.firstname}</span>
                <span className="truncate text-xs">{profile?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  onClick={handleSettingsClick}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={handleSignOut} variant="ghost">
                <LogOut />
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
