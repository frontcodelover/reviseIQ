import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/presentation/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './routes/routes';
import { THEME_ID as MATERIAL_THEME_ID } from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as joyTheme } from '@/presentation/components/ui/theme/ThemeMui';
import themeMuiCore from './presentation/components/ui/theme/ThemeMuiCore';
import { ThemeProvider } from '@mui/material/styles';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: themeMuiCore }}>
      <JoyCssVarsProvider disableTransitionOnChange theme={joyTheme} defaultMode="dark">
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
};
