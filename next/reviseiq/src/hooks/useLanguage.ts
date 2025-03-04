'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export function useLanguage() {
  const locale = useLocale();

  useEffect(() => {
    localStorage.setItem('i18nextLng', locale);
  }, [locale]);

  return {
    currentLanguage: locale,
    savedLanguage: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'fr' : 'fr'
  };
}