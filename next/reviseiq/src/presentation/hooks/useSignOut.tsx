'use client';

import { appContainer } from '@/infrastructure/config/AppContainer';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export const useHandleSignOut = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleSignOut = async () => {
    try {
      await appContainer.getAuthService().signOut();
      // La redirection sera gérée par next-intl avec la locale
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return handleSignOut;
};
