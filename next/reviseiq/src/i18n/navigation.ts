import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

// Configuration pour l'internationalisation
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation({
  locales,
  defaultLocale,
  // Nous utilisons cette option pour que next-intl gère automatiquement les préfixes de locale
  localePrefix: 'always',
});
