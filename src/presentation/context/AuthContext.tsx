import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  hasProfile: boolean;
  isPasswordRecovery: boolean;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  checkSession: (isPasswordRecovery?: boolean, shouldRedirect?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const userRepository = new SupabaseUserRepository();
  const authRepository = new SupabaseAuthRepository();

  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    hasProfile: false,
    isPasswordRecovery: false,
  });

  const isRecoveryUrl = () => {
    // Vérifier dans l'URL classique
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'recovery' && (params.get('token') || params.get('access_token'))) {
      return true;
    }
    if (window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      if (hashParams.get('type') === 'recovery' && hashParams.get('access_token')) {
        return true;
      }
    }

    return false;
  };
  const checkSession = async (isPasswordRecovery = false, shouldRedirect = false) => {
    try {
      // Ne pas vérifier la session si on est en mode récupération
      if (isRecoveryUrl()) {
        setState((prev) => ({
          ...prev,
          isPasswordRecovery: true,
          loading: false,
        }));
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setState({
          user: null,
          loading: false,
          hasProfile: false,
          isPasswordRecovery: false,
        });
        return;
      }

      const hasProfile = await userRepository.hasUserProfile(session.user.id);

      setState({
        user: {
          id: session.user.id,
          email: session.user.email || '',
        },
        hasProfile,
        loading: false,
        isPasswordRecovery: isPasswordRecovery,
      });

      // Ne pas rediriger si en mode récupération
      if (shouldRedirect && !isPasswordRecovery && !isRecoveryUrl()) {
        navigate(hasProfile ? '/dashboard' : '/first-time');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    setMounted(true);

    // Si on est sur l'URL de récupération, rediriger vers update-password
    if (isRecoveryUrl()) {
      setState((prev) => ({
        ...prev,
        isPasswordRecovery: true,
        loading: false,
      }));
      navigate(`/update-password${window.location.search}${window.location.hash}`, {
        replace: true,
      });
      return;
    }

    checkSession(false, false);
    return () => setMounted(false);
  }, []);

  const signOut = async () => {
    try {
      await authRepository.signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
    setState({
      user: null,
      loading: false,
      hasProfile: false,
      isPasswordRecovery: false,
    });
    navigate('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        hasProfile: state.hasProfile,
        isPasswordRecovery: state.isPasswordRecovery,
        signOut,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider');
  }
  return context;
};
