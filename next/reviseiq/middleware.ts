import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

// Créer le middleware next-intl
const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

// Exporter une fonction personnalisée pour gérer les redirections
export default function middleware(request: NextRequest) {
  // Rediriger la racine vers la locale par défaut
  const pathname = request.nextUrl.pathname;

  // Si nous sommes à la racine, rediriger vers la locale par défaut
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return Response.redirect(url);
  }

  // Sinon, utiliser le middleware next-intl
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
