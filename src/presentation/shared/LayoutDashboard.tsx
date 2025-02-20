import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { theme } from '@/presentation/components/ui/theme/ThemeMui';
import { IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import React from 'react';
import styled from 'styled-components';

import Notification from '../components/dashboard/Notification';
import Header from '../components/dashboard/shared/Header';
import Sidebar from '../components/dashboard/shared/Sidebar';
import { AppSidebar } from '../components/dashboard/shared/layout/Sidebar';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />

        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(6px + var(--Header-height))', md: 0 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
            [theme.getColorSchemeSelector('light')]: {
              backgroundColor: 'background',
            },
            [theme.getColorSchemeSelector('dark')]: {
              backgroundColor: 'background',
            },
          }}
        >
          <ContentWrapper>
            <PositionBell>
              <IconButton variant="outlined" size="sm" style={{ padding: '0.5rem' }}>
                <Notification />
              </IconButton>
            </PositionBell>
            {children}
          </ContentWrapper>
        </Box>
      </Box>
    </>
  );
}

const ContentWrapper = styled.div`
  padding: 0rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const PositionBell = styled.div`
  position: relative;
  display: flex;
  align-items: end;
  justify-content: end;
  top: 1rem;
  right: 1rem;
`;
