import styled from 'styled-components';
import SearchBar from '@/presentation/components/dashboard/shared/SearchBar';
import Notification from '@/presentation/components/dashboard/Notification';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import React, { useState } from 'react';
import {
  SidebarTwo,
  SIDEBAR_STATE_KEY,
} from '@/presentation/components/dashboard/shared/SidebarTwo';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCloseSidebar = () => {
    setIsCollapsed(false);
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(false));
  };
  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <MainContainer $isCollapsed={isCollapsed}>
        <Overlay $isCollapsed={isCollapsed} onClick={handleCloseSidebar} />
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

const MainContainer = styled.main<{ $isCollapsed: boolean }>`
  padding: 2rem 1rem;
  margin-left: 55px;
  position: relative;
  max-width: 1280px;
  min-width: 320px;
  margin: auto;
`;

const Overlay = styled.div<{ $isCollapsed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 1 : 0)};
  visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out;
  z-index: 50;
`;

const SidebarContainer = styled(SidebarTwo)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${COLORS.white};
  overflow-y: auto;
  transition: transform 0.2s ease-in-out;
`;

const ContentWrapper = styled.div`
  padding: 2rem 3rem;
`;

const LayoutFlex = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  justify-content: center;
  gap: 1rem;
`;

const SearchBarLayout = styled.div`
  flex: 1;
`;
