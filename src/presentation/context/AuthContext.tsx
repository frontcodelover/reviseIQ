import { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';

export interface ExtendedUser extends SupabaseUser {
  recovery_mode?: boolean;
}

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  setUser: (user: ExtendedUser | null) => void;
  hasProfile: boolean;
  isPasswordRecovery: boolean;
}

interface AuthState {
  user: ExtendedUser | null;
  hasProfile: boolean;
  loading: boolean;
  isPasswordRecovery: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  hasProfile: false,
  isPasswordRecovery: false,
});

const userRepository = new SupabaseUserRepository();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    hasProfile: false,
    loading: true,
    isPasswordRecovery: false,
  });

  const navigate = useNavigate();

  const setUser = (user: ExtendedUser | null) => {
    setState((prev) => ({ ...prev, user }));
  };

  useEffect(() => {
    let mounted = true;

    const checkUserAndProfile = async () => {
      try {
        console.log('🔄 Démarrage vérification session...');
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) {
          console.log('❌ Composant démonté, arrêt du traitement');
          return;
        }

        // Vérification du mode récupération
        const storedRecoveryMode = localStorage.getItem('passwordRecoveryMode');
        const isPasswordRecovery = storedRecoveryMode === 'true';

        console.log('🔍 Debug AUTH:', {
          recovery_mode: (session?.user as ExtendedUser)?.recovery_mode,
          isPasswordRecovery,
          storedRecoveryMode,
        });

        // Si en mode récupération, ne pas rediriger
        if (isPasswordRecovery) {
          console.log('🔑 Mode récupération actif');
          setState((prev) => ({
            ...prev,
            user: session?.user || null,
            isPasswordRecovery: true,
            loading: false,
          }));
          return;
        }

        if (!session?.user) {
          console.log('❌ Pas de session utilisateur');
          setState((prev) => ({ ...prev, loading: false }));
          return;
        }

        console.log('✅ Session utilisateur trouvée:', {
          userId: session.user.id,
          email: session.user.email,
        });

        const hasProfile = await userRepository.hasUserProfile(session.user.id);
        console.log('👤 Profil utilisateur:', { hasProfile });

        setState({
          user: session.user,
          hasProfile,
          loading: false,
          isPasswordRecovery: false,
        });

        // Navigation uniquement si pas en mode récupération
        if (!isPasswordRecovery) {
          if (hasProfile) {
            console.log('➡️ Redirection vers dashboard');
            navigate('/dashboard');
          } else {
            console.log('➡️ Redirection vers first-time');
            navigate('/first-time');
          }
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
        if (mounted) {
          setState((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    checkUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Changement état auth:', event);

      if (event === 'PASSWORD_RECOVERY') {
        console.log('🔑 Événement PASSWORD_RECOVERY détecté');
        localStorage.setItem('passwordRecoveryMode', 'true');
        setState((prev) => ({
          ...prev,
          isPasswordRecovery: true,
          user: session?.user || null,
        }));
        navigate('/update-password');
        return;
      }

      if (event === 'SIGNED_OUT') {
        console.log('🚪 Déconnexion détectée');
        localStorage.removeItem('passwordRecoveryMode');
        setState({
          user: null,
          hasProfile: false,
          loading: false,
          isPasswordRecovery: false,
        });
        navigate('/login');
        return;
      }

      if (session?.user) {
        console.log('👤 Session mise à jour, vérification du profil');
        checkUserAndProfile();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        setUser,
        hasProfile: state.hasProfile,
        isPasswordRecovery: state.isPasswordRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
