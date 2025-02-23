import { AppProvider } from '@/routes/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider />
    </QueryClientProvider>
  );
};
