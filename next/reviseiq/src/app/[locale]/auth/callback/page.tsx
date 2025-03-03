'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { LoadingScreen } from '@/presentation/components/ui/loading-screen';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { checkSession } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await checkSession();
        router.push('/dashboard');
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [checkSession, router]);

  return <LoadingScreen />;
}