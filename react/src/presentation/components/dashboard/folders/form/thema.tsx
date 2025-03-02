import { cn } from '@/lib/utils';
import {
  type ThemaKey,
  ThemaLabelKeys,
} from '@/presentation/components/dashboard/folders/form/themaLabel';
import { Button } from '@/presentation/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ThemaProps {
  setThema: (value: ThemaKey) => void;
  value: ThemaKey;
}

export function Thema({ setThema, value: initialValue }: ThemaProps) {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<ThemaKey>(initialValue || 'OTHER');

  const handleSelect = (key: ThemaKey) => {
    setSelectedValue(key);
    setThema(key);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="flex flex-wrap gap-2">
        {ThemaLabelKeys.map(({ key, i18nKey }) => {
          const label = t(i18nKey);
          return (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={selectedValue === key ? 'default' : 'outline'}
              onClick={() => handleSelect(key as ThemaKey)}
              className={cn(
                'shrink-0 font-normal',
                selectedValue === key && 'bg-primary text-primary-foreground'
              )}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
