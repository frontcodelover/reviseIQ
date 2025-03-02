import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // ✅ Utiliser requestLocale avec await
  const locale = (await requestLocale) || defaultLocale;

  console.log('Locale résolue dans getRequestConfig:', locale);

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
