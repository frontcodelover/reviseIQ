'use client';

import { Link } from '@/i18n/navigation';
import { forwardRef } from 'react';

interface LocaleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// Avec localePrefix: 'always', next-intl gère déjà les préfixes de locale
// Ce composant est maintenant un simple wrapper pour le déboggage
export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(({ href, children, ...props }, ref) => {
  console.log(`LocaleLink: Utilisation du lien ${href}`);
  return (
    <Link ref={ref} href={href} {...props}>
      {children}
    </Link>
  );
});

LocaleLink.displayName = 'LocaleLink';
