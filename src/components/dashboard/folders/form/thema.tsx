import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemaLabelKeys } from './themaLabel';

interface ThemaProps {
  setThema: (value: string) => void;
  value: string;
}

const Thema: React.FC<ThemaProps> = ({ setThema, value: initialValue }) => {
  const { t } = useTranslation();
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
  };

  return (
    <div className="w-full max-w-full overflow-hidden px-1 py-2">
      <div className="flex flex-wrap gap-2">
        {ThemaLabel.map((theme) => (
          <Button
            key={theme.value}
            type="button"
            variant={selectedValue === theme.value ? 'default' : 'outline'}
            className="shrink-0"
            onClick={() => handleSelect(theme.value)}
          >
            <span className="text-xs font-normal">{theme.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Thema;
