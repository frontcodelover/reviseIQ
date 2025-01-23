import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/presentation/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './routes/routes';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
