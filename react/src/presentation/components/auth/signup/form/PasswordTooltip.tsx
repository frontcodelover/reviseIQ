import { Validation } from '@/domain/entities/User';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PasswordTooltipProps {
  validation: Validation;
}

export function PasswordTooltip({ validation }: PasswordTooltipProps) {
  const { t } = useTranslation();

  const requirements = [
    { key: 'minLength', label: 'auth.minLength' },
    { key: 'minLowercase', label: 'auth.minLowercase' },
    { key: 'minUppercase', label: 'auth.minUppercase' },
    { key: 'minNumber', label: 'auth.minNumber' },
    { key: 'minSpecial', label: 'auth.minSpecial' },
  ] as const;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            ?
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-80 bg-popover p-4 text-popover-foreground" side="right">
          <div className="space-y-2">
            <p className="text-sm font-medium">{t('auth.content')}</p>
            <div className="space-y-1">
              {requirements.map(({ key, label }) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-center gap-2 text-sm',
                    validation[key] ? 'text-success' : 'text-destructive'
                  )}
                >
                  {validation[key] ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
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
