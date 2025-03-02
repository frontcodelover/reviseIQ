'use client';

import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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
  // ✅ Utiliser les hooks de navigation Next.js
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    // ✅ Utiliser les hooks de Next.js pour accéder aux paramètres de requête
    if (typeof window !== 'undefined') {
      // Côté client, on peut utiliser window.location
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
    } else {
      // Côté serveur, utiliser les hooks de Next.js
      const type = searchParams.get('type');
      const token = searchParams.get('token');
      const accessToken = searchParams.get('access_token');

      if (type === 'recovery' && (token || accessToken)) {
        return true;
      }
    }
    return false;
  };

  const checkSession = async (isPasswordRecovery = false, shouldRedirect = false) => {
    try {
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

      if (shouldRedirect && !isPasswordRecovery && !isRecoveryUrl()) {
        // ✅ Navigation Next.js
        router.push(hasProfile ? '/dashboard' : '/first-time');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isRecoveryUrl()) {
      setState((prev) => ({
        ...prev,
        isPasswordRecovery: true,
        loading: false,
      }));

      // ✅ Créer l'URL avec les paramètres Next.js
      let redirectUrl = `/update-password`;
      if (typeof window !== 'undefined') {
        redirectUrl += window.location.search + window.location.hash;
      }

      router.push(redirectUrl);
      return;
    }

    checkSession(false, false);
  }, [mounted, pathname, searchParams]); // ✅ Dépendances Next.js

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
    router.push('/login');
  };

  // Protection contre le rendu côté serveur
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
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};
