'use client';
import { Button } from '@/presentation/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/presentation/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/presentation/context/ThemeProvider';
import { useTranslations } from 'next-intl';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>{t('dashboard.light')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>{t('dashboard.dark')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>{t('dashboard.system')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
