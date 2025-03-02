'use client';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/presentation/components/ui/tooltip';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Définir l'interface qui correspond à ce que validatePassword() retourne réellement
interface Validation {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  minLength: boolean;
}

interface PasswordTooltipProps {
  validation: Validation;
}

export function PasswordTooltip({ validation }: PasswordTooltipProps) {
  const t = useTranslations('auth');

  // Utiliser un tableau simple qui mappe les propriétés retournées aux labels de traduction
  const requirements = [
    { key: 'minLength', label: 'minLength', isValid: validation.minLength },
    { key: 'hasLowerCase', label: 'minLowercase', isValid: validation.hasLowerCase },
    { key: 'hasUpperCase', label: 'minUppercase', isValid: validation.hasUpperCase },
    { key: 'hasNumber', label: 'minNumber', isValid: validation.hasNumber },
    { key: 'hasSpecialChar', label: 'minSpecial', isValid: validation.hasSpecialChar },
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type='button' className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
            ?
          </button>
        </TooltipTrigger>
        <TooltipContent className='w-80 bg-popover p-4 text-popover-foreground' side='right'>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>{t('content')}</p>
            <div className='space-y-1'>
              {requirements.map(({ key, label, isValid }) => (
                <div key={key} className={cn('flex items-center gap-2 text-sm', isValid ? 'text-success' : 'text-destructive')}>
                  {isValid ? <CheckCircle2 className='h-4 w-4' /> : <XCircle className='h-4 w-4' />}
                  {t(label)}
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
