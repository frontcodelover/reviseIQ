import { useNavigate } from 'react-router-dom';
import { getBackend } from '@/services/backend';

export const useHandleSignOut = () => {
  const navigate = useNavigate();
  const backend = getBackend();

  const handleSignOut = async () => {
    try {
      await backend.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return handleSignOut;
};
