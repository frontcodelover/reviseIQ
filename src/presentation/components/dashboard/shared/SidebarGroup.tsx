import styled from 'styled-components';
import SidebarGroupLabel from '@/presentation/components/dashboard/shared/SidebarGroupLabel';
import SidebarGroupContent from '@/presentation/components/dashboard/shared/SidebarGroupContent';
import { SidebarItem } from '@/presentation/types/SidebarItem';

const StyledSidebarGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
`;

const SidebarGroup = ({ items }: { items: SidebarItem[] }) => {
  return (
    <StyledSidebarGroup>
      <SidebarGroupLabel />
      <SidebarGroupContent items={items} />
    </StyledSidebarGroup>
  );
};

export default SidebarGroup;
