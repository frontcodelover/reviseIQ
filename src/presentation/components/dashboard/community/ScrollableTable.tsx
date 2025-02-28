import { cn } from '@/lib/utils';
import * as React from 'react';

interface ScrollableTableProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollableTable({ children, className }: ScrollableTableProps) {
  return (
    <div className="w-full rounded-md border">
      <div
        className={cn('w-full overflow-x-auto', className)}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
    </div>
  );
}
