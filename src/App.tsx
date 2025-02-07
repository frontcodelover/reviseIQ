import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/presentation/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './routes/routes';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from '@/presentation/components/ui/theme/ThemeMui';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <CssVarsProvider disableTransitionOnChange theme={theme} defaultMode="light">
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
