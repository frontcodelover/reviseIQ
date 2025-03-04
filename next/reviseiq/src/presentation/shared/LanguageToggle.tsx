'use client';

import { Button } from '@/presentation/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/presentation/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useEffect } from 'react';

export function LanguageToggle() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Synchroniser la locale avec le localStorage au chargement et aux changements
  useEffect(() => {
    localStorage.setItem('i18nextLng', currentLocale);
  }, [currentLocale]);

  const changeLanguage = (newLocale: string) => {
    // Sauvegarder la nouvelle langue dans le localStorage
    localStorage.setItem('i18nextLng', newLocale);

    // Utiliser le router de next-intl pour la navigation
    router.push(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Languages className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{t('changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => changeLanguage('fr')} className={currentLocale === 'fr' ? 'bg-accent' : ''}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLocale === 'en' ? 'bg-accent' : ''}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
