import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/presentation/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './routes/routes';
import { CssVarsProvider } from '@mui/joy/styles';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme as joyTheme } from '@/presentation/components/ui/theme/ThemeMui';
export const App = () => {
  const queryClient = new QueryClient();

  return (
    <CssVarsProvider disableTransitionOnChange theme={joyTheme} defaultMode="light">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </CssVarsProvider>
  );
};
