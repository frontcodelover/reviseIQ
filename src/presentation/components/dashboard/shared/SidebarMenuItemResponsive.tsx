// presentation/components/dashboard/shared/SidebarMenuItem.tsx
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

const StyledSidebarMenuItem = styled.div`
  color: ${COLORS.black};
`;

const SidebarMenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
`;

const ActiveItem = styled.div`
  color: ${COLORS.primary};
  background-color: ${COLORS.white};
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 1rem 0;
`;

const InactiveItem = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 0.75rem; /* gap-3 */
`;

const SidebarMenuItemResponsive: React.FC<{ item: SidebarItem }> = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <StyledSidebarMenuItem>
      <SidebarMenuButton>
        {isActive ? (
          <ActiveItem>
            <ItemContent>
              <ItemIcon>{item.icon && <item.icon />}</ItemIcon>
            </ItemContent>
          </ActiveItem>
        ) : (
          <InactiveItem to={item.url || '#'}>
            <ItemContent>
              <ItemIcon>{item.icon && <item.icon />}</ItemIcon>
            </ItemContent>
          </InactiveItem>
        )}
      </SidebarMenuButton>
    </StyledSidebarMenuItem>
  );
};

export default SidebarMenuItemResponsive;
