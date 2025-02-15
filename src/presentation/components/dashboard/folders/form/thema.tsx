import { Button, Box, useTheme } from '@mui/joy';
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

  const theme = useTheme(); // Use the useTheme hook

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {ThemaLabel.map((themeLabel) => (
          <Button
            key={themeLabel.value}
            size="sm"
            onClick={() => handleSelect(themeLabel.value)}
            sx={{
              flexShrink: 0,
              fontWeight: 'normal',
              backgroundColor:
                selectedValue === themeLabel.value
                  ? theme.palette.primary.solidHoverBg
                  : theme.palette.background.level2,
              color: selectedValue === themeLabel.value ? 'white' : 'black',
              '&:focus': {
                backgroundColor: theme.palette.primary.solidHoverBg,
                color: 'white',
              },
              '&:hover': {
                backgroundColor: theme.palette.primary.solidHoverBg,
                color: 'white',
              },
            }}
          >
            {themeLabel.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Thema;
