import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appSidebar';
import BreadcrumbDashboard from '@/components/breadcrumb';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <div className="flex items-center gap-2 px-4 py-2 w-full">
          <SidebarTrigger />
          <BreadcrumbDashboard />
        </div>
        <div className="px-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
