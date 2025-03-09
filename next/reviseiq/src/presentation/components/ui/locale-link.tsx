'use client';

import { Link } from '@/i18n/navigation';
import { forwardRef, AnchorHTMLAttributes } from 'react';

interface LocaleLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(({ href, children, ...props }, ref) => {
  return (
    <Link ref={ref} href={href} {...props}>
      {children}
    </Link>
  );
});

LocaleLink.displayName = 'LocaleLink';
