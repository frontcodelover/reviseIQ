export function getCurrentLocale(): string {
  // Extraire la locale depuis le pathname
  const pathname = window.location.pathname;
  const localeMatch = pathname.match(/^\/([a-z]{2})\//);
  return localeMatch ? localeMatch[1] : 'fr'; // 'fr' comme fallback
}