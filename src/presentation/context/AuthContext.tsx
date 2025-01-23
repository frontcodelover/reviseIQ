import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { AuthContextType } from '@/presentation/types/AuthContextTypes';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { User } from '@/domain/entities/User';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  hasProfile: false,
});

export interface AuthState {
  user: User | null;
  hasProfile: boolean;
  loading: boolean;
}

const userRepository = new SupabaseUserRepository();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    hasProfile: false,
    loading: true,
  });

  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const checkUserAndProfile = async () => {
      try {
        console.log('🔄 Démarrage vérification session...');
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (!session?.user) {
          console.log('❌ Pas de session utilisateur');
          setState((prev) => ({ ...prev, loading: false }));
          return;
        }

        console.log('✅ Session utilisateur trouvée');
        const hasProfile = await userRepository.hasUserProfile(session.user.id);

        setState({
          user: session.user,
          hasProfile,
          loading: false,
        });

        // Redirection après connexion réussie
        if (hasProfile) {
          navigate('/dashboard');
        } else {
          navigate('/first-time');
        }
      } catch (error) {
        console.error('🚨 Erreur:', error);
        if (mounted) {
          setState((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    checkUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      console.log('🔄 Changement état auth:', event);
      checkUserAndProfile();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ ...state, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
