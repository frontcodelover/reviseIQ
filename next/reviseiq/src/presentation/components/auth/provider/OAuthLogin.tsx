'use client';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '@/presentation/context/AuthContext';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

function OAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { user, checkSession } = useAuth();

  // Surveiller les changements d'état d'authentification avec Supabase
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Mettre à jour l'état d'authentification dans notre contexte
        await checkSession();

        // Rediriger vers le tableau de bord
        router.push('/dashboard');
      }
    });

    // Nettoyer l'écouteur lors du démontage
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [checkSession, router]);

  // Vérifier également si l'utilisateur est déjà connecté
  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleProviderLogin = async (provider: 'google') => {
    setLoading(true);
    setError('');
    try {
      // Lancer la procédure de connexion OAuth
      // La redirection se fera via l'écouteur d'événements onAuthStateChange
      await appContainer.getAuthService().signInWithProvider(provider);

      // Note: Ici nous ne faisons pas de redirection directe car le flux OAuth
      // redirige l'utilisateur vers le fournisseur puis revient sur notre site
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || t('auth.errorConnectingWith', { provider }));
      } else {
        setError(t('auth.errorConnectingWith', { provider }));
      }
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <Button variant='default' size='lg' className='w-full bg-primary font-bold hover:bg-primary/90' onClick={() => handleProviderLogin('google')} disabled={loading}>
        {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <GoogleIcon className='mr-2 h-4 w-4' />}
        {t('auth.signInWithGoogle')}
      </Button>
      {error && <p className='mt-4 text-center text-destructive'>{error}</p>}
    </div>
  );
}

// Composant pour l'icône Google
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z'
      fill='currentColor'
    />
    <path
      d='M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z'
      fill='currentColor'
    />
    <path
      d='M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z'
      fill='currentColor'
    />
    <path
      d='M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z'
      fill='currentColor'
    />
  </svg>
);

export default OAuthLogin;
