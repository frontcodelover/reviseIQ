// presentation/components/dashboard/shared/SidebarMenuItem.tsx
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { SidebarItem } from '@/presentation/types/SidebarItem';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

const SidebarMenuItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <StyledSidebarMenuItem>
      <SidebarMenuButton>
        {isActive ? (
          <ActiveItem>
            <ItemContent>
              <ItemIcon>
                {item.icon && <item.icon />}
                <ItemTitle>{item.title}</ItemTitle>
              </ItemIcon>
              {item.nb && <ItemBadge color={item.color || ''}>{item.nb}</ItemBadge>}
            </ItemContent>
          </ActiveItem>
        ) : (
          <InactiveItem to={item.url || '#'}>
            <ItemContent>
              <ItemIcon>
                {item.icon && <item.icon />}
                <ItemTitle>{item.title}</ItemTitle>
              </ItemIcon>
              {item.nb && <ItemBadge color={item.color || ''}>{item.nb}</ItemBadge>}
            </ItemContent>
          </InactiveItem>
        )}
      </SidebarMenuButton>
    </StyledSidebarMenuItem>
  );
};

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
  gap: 0.75rem; /* gap-3 */
`;

const ItemTitle = styled.span`
  font-weight: 500; /* font-semibold */
`;

const ItemBadge = styled.span<{ color: string }>`
  font-weight: 600;
  margin-left: auto;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.color};
  margin-left: 0.75rem;
`;

export default SidebarMenuItem;
