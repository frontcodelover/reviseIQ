import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';
import { useState, useEffect } from 'react';

const COLOR_SCHEME_STORAGE_KEY = 'reviseIQ-color-scheme';

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load the color scheme from local storage on mount
    const storedColorScheme = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    if (storedColorScheme) {
      setMode(storedColorScheme as 'light' | 'dark');
    } else {
      setMode('light'); // Default to light mode if nothing is stored
    }
  }, [setMode]);

  // Update local storage when the mode changes
  useEffect(() => {
    if (mounted && mode) {
      localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, mode);
    }
  }, [mode, mounted]);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" {...other} sx={sx} disabled />;
  }

  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        onClick?.(event);
      }}
      sx={[
        mode === 'dark'
          ? { '& > *:first-of-type': { display: 'none' } }
          : { '& > *:first-of-type': { display: 'initial' } },
        mode === 'light'
          ? { '& > *:last-child': { display: 'none' } }
          : { '& > *:last-child': { display: 'initial' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}
