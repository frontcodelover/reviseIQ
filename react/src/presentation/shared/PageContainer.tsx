import { cn } from '@/lib/utils';
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className={cn('mx-auto w-full px-4 py-6 sm:px-6 lg:px-8', className)}>
        <div className="w-full max-w-full overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}
