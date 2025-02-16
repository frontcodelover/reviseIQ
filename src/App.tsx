import { theme as joyTheme } from '@/presentation/components/ui/theme/ThemeMui';
import { AppProvider } from '@/routes/AppProvider';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { THEME_ID as MATERIAL_THEME_ID } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import themeMuiCore from './presentation/components/ui/theme/ThemeMuiCore';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: themeMuiCore }}>
      <JoyCssVarsProvider disableTransitionOnChange theme={joyTheme} defaultMode="dark">
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <AppProvider />
        </QueryClientProvider>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
};
