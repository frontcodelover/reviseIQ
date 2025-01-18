import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/presentation/components/dashboard/shared/appSidebar';
import BreadcrumbDashboard from '@/presentation/components/dashboard/breadcrumb';
import SearchBar from '../components/dashboard/shared/SearchBar';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className='md:hidden pl-2' />
      <main className="w-full bg-white bg-gradient-to-b">
        <div className="flex w-full items-center gap-2 px-4 py-2">
        </div>
        <div className="mx-6 pt-4"> 
          <SearchBar />    
        {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
