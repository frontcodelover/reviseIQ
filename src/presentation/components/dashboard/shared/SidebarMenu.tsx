// presentation/components/dashboard/shared/SidebarMenu.tsx
import SidebarMenuItem from '@/presentation/components/dashboard/shared/SidebarMenuItem';
import { SidebarItem } from '@/presentation/types/SidebarItem';

const SidebarMenu = ({ items }: { items: SidebarItem[] }) => {
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title} item={item} />
      ))}
    </>
  );
};

export default SidebarMenu;
