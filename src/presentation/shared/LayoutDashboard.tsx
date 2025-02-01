// presentation/shared/LayoutDashboard.tsx
import styled from 'styled-components';
import Sidebar from '@/presentation/components/dashboard/shared/Sidebar';
import SearchBar from '../components/dashboard/shared/SearchBar';
import Notification from '../components/dashboard/Notification';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

const MainContainer = styled.main`
  width: 100%;
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
  background: ${COLORS.lightgray};
`;

const ContentWrapper = styled.div`
  margin-left: 250px; /* Ajustez la marge selon la largeur de la barre latérale */
  padding: 1.5rem 2.5rem;
`;

const LayoutFlex = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  justify-content: center;
`;

const SearchBarLayout = styled.div`
  flex: 1;
`;

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <ContentWrapper>
          <LayoutFlex>
            <SearchBarLayout>
              <SearchBar />
            </SearchBarLayout>
            <Notification />
          </LayoutFlex>
          {children}
        </ContentWrapper>
      </MainContainer>
    </>
  );
}
