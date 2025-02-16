import { router } from '@/routes/routes';
import { RouterProvider } from 'react-router-dom';

export const AppProvider = () => {
  return <RouterProvider router={router} fallbackElement={<div>Chargement...</div>} />;
};
