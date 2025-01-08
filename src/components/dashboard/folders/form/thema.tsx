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

function Thema() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const ThemaLabel = ThemaLabelKeys.map((key) => ({
    value: t(key),
    label: t(key),
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? ThemaLabel.find((framework) => framework.value === value)?.label
            : 'Sélectionner une thématique...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Search framework..."
            className="h-9 w-full"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ThemaLabel.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => {
                    setValue(framework.value);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Thema;
