import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createIntlMiddleware({
  locales,
  defaultLocale,
  // ✅ DOIT correspondre à la configuration dans navigation.ts
  localePrefix: 'always', // ou 'never', mais le même que dans navigation.ts
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
