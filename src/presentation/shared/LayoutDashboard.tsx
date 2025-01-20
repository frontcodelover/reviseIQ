// presentation/shared/LayoutDashboard.tsx
import styled from 'styled-components';
import Sidebar from '@/presentation/components/dashboard/shared/Sidebar';
import SearchBar from '../components/dashboard/shared/SearchBar';

const MainContainer = styled.main`
  width: 100%;
  background: #f0f7ff;
  color: #333;
  min-height: 100vh;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;

  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  margin-left: 250px; /* Ajustez la marge selon la largeur de la barre latérale */
  padding: 1.5rem 2.5rem;
`;

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <ContentWrapper>
          <SearchBar />
          {children}
        </ContentWrapper>
      </MainContainer>
    </>
  );
}
