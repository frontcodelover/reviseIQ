import { appContainer } from '@/infrastructure/config/AppContainer';
import { useNavigate } from 'react-router-dom';

export const useHandleSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await appContainer.getAuthService().signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return handleSignOut;
};
