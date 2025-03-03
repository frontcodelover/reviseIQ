'use client';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/presentation/components/ui/breadcrumb';
import { useBreadcrumb } from '@/presentation/hooks/useBreadcrumb';
import React from 'react';
import { LocaleLink as Link } from '../../../ui/locale-link';

interface DynamicBreadcrumbProps {
  className?: string;
}

export function DynamicBreadcrumb({ className }: DynamicBreadcrumbProps) {
  const breadcrumbItems = useBreadcrumb();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb className={cn('flex-1', className)}>
      <BreadcrumbList className='flex items-center'>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem className={cn('flex items-center', index === 0 ? 'hidden md:flex' : 'flex')}>
              {item.isActive ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator aria-hidden className={cn('mx-2 flex items-center', index === 0 ? 'hidden md:flex' : 'flex')} />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
