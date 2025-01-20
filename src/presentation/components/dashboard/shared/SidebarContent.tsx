// presentation/components/dashboard/shared/SidebarContent.tsx
import styled from 'styled-components';
import SidebarGroup from '@/presentation/components/dashboard/shared/SidebarGroup';
import { SidebarItem } from '@/presentation/types/SidebarItem';

const StyledSidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #fff; /* bg-gray-50 */
`;

const SidebarContent = ({ items }: { items: SidebarItem[] }) => {
  return (
    <StyledSidebarContent>
      <SidebarGroup items={items} />
    </StyledSidebarContent>
  );
};

export default SidebarContent;
