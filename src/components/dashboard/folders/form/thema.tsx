import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemaLabelKeys } from './themaLabel';

interface ThemaProps {
  setThema: (value: string) => void;
  value: string;
}

const Thema: React.FC<ThemaProps> = ({ setThema, value: initialValue }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    initialValue || t('dashboard.folder.thema.other')
  );

  const ThemaLabel = ThemaLabelKeys.map((key) => ({
    value: t(key),
    label: t(key),
  }));

  const handleSelect = (value: string) => {
    const selectedValue = value || t('dashboard.folder.thema.other');
    setSelectedValue(selectedValue);
    setThema(selectedValue);
    setOpen(false);
  };

	return (
		<div className="w-full">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {ThemaLabel.find(
            (framework) => 
              framework.value === (selectedValue || t('dashboard.folder.thema.other'))
          )?.label || t('dashboard.folder.thema.other')}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command className="w-full">
          <CommandInput
            placeholder={t('dashboard.folder.thema.search')}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{t('dashboard.folder.thema.empty')}</CommandEmpty>
            <CommandGroup>
              {ThemaLabel.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={handleSelect}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
  );
};

export default Thema;