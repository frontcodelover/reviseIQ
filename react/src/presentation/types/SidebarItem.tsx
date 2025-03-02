// types.ts
import { SVGProps } from 'react';

export interface SidebarItem {
  id?: string;
  label?: string;
  icon?: React.FC<SVGProps<SVGSVGElement>>;
  title?: string;
  path?: string | null | undefined;
  nb?: string | number | null;
  color?: string;
  url?: string;
}
