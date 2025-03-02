import { createNavigation } from 'next-intl/navigation';

// Configuration pour l'internationalisation
const routing = {
  locales: ['en', 'fr'] as const,
  defaultLocale: 'fr' as const,
  // IMPORTANT: Doit correspondre à celle du middleware ('never')
  localePrefix: 'never',
};

// Exportation des fonctions de navigation
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
