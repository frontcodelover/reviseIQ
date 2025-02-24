import { ThemeProvider } from '@/presentation/context/ThemeProvider';
import { AppProvider } from '@/presentation/routes/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
