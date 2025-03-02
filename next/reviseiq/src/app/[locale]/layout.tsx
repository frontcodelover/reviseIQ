import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/config';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/presentation/context/AuthContext';
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
  // ✅ Extraire la locale directement du segment d'URL et vérifier qu'elle est valide
  const { locale } = params;
  const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;

  console.log('Locale depuis URL segment (safe):', safeLocale);

  // ✅ Définir explicitement la locale pour toutes les requêtes
  setRequestLocale(safeLocale);

  // ✅ Charger les messages avec gestion d'erreur améliorée
  let messages = {};
  try {
    // Charger les messages uniquement si la locale est valide
    if (locales.includes(safeLocale as any)) {
      messages = (await import(`@/i18n/messages/${safeLocale}.json`)).default;
      console.log('Messages chargés pour locale:', Object.keys(messages).length);
    }
  } catch (error) {
    console.error(`Erreur de chargement des messages pour ${safeLocale}:`, error);
    try {
      // Fallback sur les messages en français
      messages = (await import('@/i18n/messages/fr.json')).default;
    } catch (fallbackError) {
      console.error('Erreur de chargement des messages par défaut:', fallbackError);
    }
  }

  return (
    <html lang={safeLocale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider locale={safeLocale} messages={messages}>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
