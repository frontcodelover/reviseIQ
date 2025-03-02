import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/config';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  // ✅ Extraire la locale directement du segment d'URL
  const { locale } = params;
  console.log('Locale depuis URL segment:', locale);

  // ✅ Définir explicitement la locale pour toutes les requêtes
  setRequestLocale(locale);

  // ✅ Charger les messages directement pour cette locale
  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Erreur de chargement des messages pour ${locale}:`, error);
    messages = {};
  }

  console.log('Messages chargés pour locale:', Object.keys(messages));

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
