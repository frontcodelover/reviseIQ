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
`;

const InactiveItem = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  width: 100%;
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
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-semibold */
  padding: 16px 10px;
`;

const ItemBadge = styled.span<{ color: string }>`
  font-weight: 600; /* font-normal */
  margin-left: auto;
  border-radius: 0.5rem; /* rounded-lg */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  font-size: 0.75rem; /* text-xs */
  color: ${COLORS.white};
  margin-left: 0.75rem;
  background-color: ${(props) => props.color};
`;

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

export default SidebarMenuItem;
