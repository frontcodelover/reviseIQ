// presentation/components/dashboard/shared/SidebarGroupContent.tsx
import styled from 'styled-components';
import SidebarMenu from '@/presentation/components/dashboard/shared/SidebarMenu';
import { SidebarItem } from '@/presentation/types/SidebarItem';

const StyledSidebarGroupContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SidebarGroupContent = ({ items }: { items: SidebarItem[] }) => {
  return (
    <StyledSidebarGroupContent>
      <SidebarMenu items={items} />
    </StyledSidebarGroupContent>
  );
};

export default SidebarGroupContent;
