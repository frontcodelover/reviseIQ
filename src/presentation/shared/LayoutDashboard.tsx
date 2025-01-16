import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/presentation/components/dashboard/appSidebar';
import BreadcrumbDashboard from '@/presentation/components/dashboard/breadcrumb';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-white bg-gradient-to-b">
        <div className="flex w-full items-center gap-2 px-4 py-2">
          <SidebarTrigger />
          <BreadcrumbDashboard />
        </div>
        <div className="mx-auto px-6 py-10 md:w-2/3 md:px-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}
