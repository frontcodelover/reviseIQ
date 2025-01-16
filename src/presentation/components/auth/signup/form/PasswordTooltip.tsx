// src/components/auth/PasswordTooltip.tsx
import { CircleHelp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

import { Validation } from '@/domain/entities/User';

export function PasswordTooltip({ validation }: { validation: Validation }) {
  const { t } = useTranslation();

  return (
    <Label className="mb-2 flex items-center gap-1 font-medium text-gray-700">
      {t('auth.password')}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleHelp className="h-4 w-4 font-light text-gray-700" />
          </TooltipTrigger>
          <TooltipContent className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
            <p className="text-gray-600">{t('auth.content')}</p>
            <ul className="space-y-1">
              <li className={validation.minLength ? 'text-green-600' : 'text-red-600'}>
                ✓ {t('auth.minLength')}
              </li>
              <li className={validation.hasLowerCase ? 'text-green-600' : 'text-red-600'}>
                ✓ {t('auth.minLowercase')}
              </li>
              <li className={validation.hasUpperCase ? 'text-green-600' : 'text-red-600'}>
                ✓ {t('auth.minUppercase')}
              </li>
              <li className={validation.hasNumber ? 'text-green-600' : 'text-red-600'}>
                ✓ {t('auth.minNumber')}
              </li>
              <li className={validation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}>
                ✓ {t('auth.minSpecial')}
              </li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Label>
  );
}
