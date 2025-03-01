import { cn } from '@/lib/utils';
import { DynamicBreadcrumb } from '@/presentation/components/dashboard/shared/layout/DynamicBreadcrumb';
import { AppSidebar } from '@/presentation/components/dashboard/shared/layout/Sidebar';
import { Separator } from '@/presentation/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/presentation/components/ui/sidebar';
import { Toaster } from '@/presentation/components/ui/sonner';
import React from 'react';

interface LayoutDashboardProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutDashboard({ children, className }: LayoutDashboardProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-visible">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />
        </header>
        <div
          className={cn(
            'flex w-full flex-1 flex-col gap-4 overflow-x-auto pb-8',
            'overscroll-x-none',
            'mt-6 px-4 sm:p-6 sm:pb-8 md:mx-auto md:max-w-7xl',
            className
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default LayoutDashboard;
