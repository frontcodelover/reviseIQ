// Définissez vos locales
export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'fr' as const;

// Configuration pour les routes
export const pathnames = {
  // Définir vos chemins ici
  '/': '/',
  '/dashboard': '/dashboard',
  // Ajoutez d'autres chemins au besoin
};

// ✅ Configuration complète du routing pour createNavigation
export const routing = {
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/dashboard': '/dashboard',
  },
  localePrefix: 'always',
};

export type AppPathnames = '/' | '/dashboard';
