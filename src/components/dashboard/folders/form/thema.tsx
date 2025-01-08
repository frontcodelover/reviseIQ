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

const Thema: React.FC<ThemaProps> = ({ setThema, value: initialValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const { t } = useTranslation();

  const ThemaLabel = ThemaLabelKeys.map((key) => ({
    value: t(key),
    label: t(key),
  }));

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setThema(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue
            ? ThemaLabel.find((framework) => framework.value === selectedValue)?.label
            : 'Sélectionner une thématique...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Rechercher un thème..."
            className="h-9 w-full"
          />
          <CommandList>
            <CommandEmpty>Aucun thème trouvé.</CommandEmpty>
            <CommandGroup>
              {ThemaLabel.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => handleSelect(framework.value)}
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
};

export default Thema;