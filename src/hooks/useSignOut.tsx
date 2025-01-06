import { useNavigate } from 'react-router-dom';
import { signOut } from '@/services/backend/auth';

export const useHandleSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return handleSignOut;
};