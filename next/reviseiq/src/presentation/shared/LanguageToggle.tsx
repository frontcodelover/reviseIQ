'use client';
import { Button } from '@/presentation/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/presentation/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageToggle() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    // Extraction du chemin actuel sans la locale
    // Pour une URL comme /fr/dashboard, on veut garder /dashboard
    // Pour /en/settings, on veut garder /settings

    const segments = window.location.pathname.split('/');
    // Enlever le premier élément (vide) et la locale
    segments.splice(0, 2);
    // Reconstruire le chemin sans locale
    const pathWithoutLocale = '/' + segments.join('/');

    console.log(`Changement vers ${locale}, chemin sans locale: ${pathWithoutLocale}`);

    // Redirection directe
    window.location.href = `/${locale}${pathWithoutLocale}`;
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
        <DropdownMenuItem onClick={() => changeLanguage('fr')}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
