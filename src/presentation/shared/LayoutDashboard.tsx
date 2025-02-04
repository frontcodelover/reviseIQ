import styled from 'styled-components';
import SearchBar from '@/presentation/components/dashboard/shared/SearchBar';
import Notification from '@/presentation/components/dashboard/Notification';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import React, { useState } from 'react';
import { SidebarTwo } from '@/presentation/components/dashboard/shared/SidebarTwo';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <MainContainer $isCollapsed={isCollapsed}>
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
  margin-left: ${({ $isCollapsed }) => ($isCollapsed ? '250px' : '30px')};
  transition: margin-left 0.2s ease-in-out;
  padding: 2rem 1rem;
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
