import { useNavigate } from 'react-router-dom';

import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SignOutUseCase } from '@/application/useCases/auth/SignOut.usecase';

const authRepository = new SupabaseAuthRepository();
const signOut = new SignOutUseCase(authRepository);

export const useHandleSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut.execute();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return handleSignOut;
};
