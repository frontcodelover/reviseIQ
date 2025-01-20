// presentation/shared/LayoutDashboard.tsx
import styled from 'styled-components';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/presentation/components/dashboard/shared/AppSidebar';
import SearchBar from '../components/dashboard/shared/SearchBar';

// Créer des composants stylisés
const MainContainer = styled.main`
  width: 100%;
  background: white;
`;

const ContentContainer = styled.div`
  margin: 1.5rem 2.5rem;
`;

const StyledSidebarTrigger = styled(SidebarTrigger)`
  padding-left: 0.5rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <StyledSidebarTrigger />
      <MainContainer>
        <ContentContainer>
          <SearchBar />
          {children}
        </ContentContainer>
      </MainContainer>
    </SidebarProvider>
  );
}
