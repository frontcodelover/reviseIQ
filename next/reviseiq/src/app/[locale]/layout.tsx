import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/presentation/context/AuthContext';
import Providers from '../providers';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Génération des paramètres statiques pour les locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) {
  // Vérification de la validité de la locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Chargement des messages avec gestion d'erreur
  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Erreur lors du chargement des messages pour ${locale}:`, error);
    // Fallback vers le français
    messages = (await import(`@/i18n/messages/fr.json`)).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>{children}</AuthProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
