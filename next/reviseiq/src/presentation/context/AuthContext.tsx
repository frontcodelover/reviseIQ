'use client';

import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// ✅ Remplacer les hooks Next.js par ceux de next-intl
import { useRouter as useNextRouter, usePathname as useNextPathname, useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ✅ Utiliser les hooks de navigation Next.js et next-intl
  const nextRouter = useNextRouter();
  const nextPathname = useNextPathname();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale(); // ✅ Récupérer la locale actuelle

  const [mounted, setMounted] = useState(false);

  const userRepository = new SupabaseUserRepository();
  const authRepository = new SupabaseAuthRepository();

  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    hasProfile: false,
    isPasswordRecovery: false,
  });

  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

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
        // ✅ Navigation avec la locale
        router.push(hasProfile ? `/${locale}/dashboard` : `/${locale}/first-time`);
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

      // Ne pas ajouter de locale ici non plus
      router.push(`/update-password${window.location.hash}`);
      return;
    }

    checkSession(false, false);
  }, [mounted, pathname, searchParams, locale]); // ✅ Ajouter la locale aux dépendances

  useEffect(() => {
    // Vérifier si on est en mode récupération de mot de passe
    const checkPasswordRecoveryMode = () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
        setIsPasswordRecovery(true);
        localStorage.setItem('passwordRecoveryMode', 'true');
      } else {
        setIsPasswordRecovery(localStorage.getItem('passwordRecoveryMode') === 'true');
      }
    };

    checkPasswordRecoveryMode();

    // ... reste du code useEffect ...
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
    // ✅ Rediriger avec la locale
    router.push(`/${locale}/login`);
  };

  // Protection contre le rendu côté serveur
  if (!mounted) {
    return null;
  }

  const value = {
    user: state.user,
    loading: state.loading,
    hasProfile: state.hasProfile,
    isPasswordRecovery: state.isPasswordRecovery,
    signOut,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};
