import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appSidebar';
import BreadcrumbDashboard from '@/components/breadcrumb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <BreadcrumbDashboard />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
