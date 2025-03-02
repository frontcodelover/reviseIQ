'use client';

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { useAuth } from '@/presentation/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation'; // ✅ Importer de @/i18n/navigation et non next/navigation
import { useLocale } from 'next-intl'; // ✅ Ajouter useLocale

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale(); // ✅ Récupérer la locale
  const { isPasswordRecovery } = useAuth();
  const t = useTranslations('auth'); // ✅ Spécifier le namespace auth

  useEffect(() => {
    // ✅ Vérifier si l'URL contient un hash access_token
    const handleHashParams = () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        // Le token est présent, on continue
        return;
      } else if (!isPasswordRecovery) {
        // Pas de token et pas en mode récupération, rediriger
        router.push(`/${locale}/login`);
      }
    };

    handleHashParams();
  }, [isPasswordRecovery, router, locale]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return t('passwordLengthError');
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('passwordMismatchError'));
      setLoading(false);
      return;
    }

    try {
      await appContainer.getAuthService().updateUserPassword(newPassword);
      localStorage.removeItem('passwordRecoveryMode');
      await supabase.auth.signOut();
      router.push(`/login`); // ✅ Laisser next-intl gérer la locale
    } catch (err) {
      console.error('Erreur mise à jour mot de passe:', err);

      // Vérifier si c'est l'erreur de mot de passe identique
      if (err instanceof Error) {
        if (err.message === 'PASSWORD_SAME_AS_OLD') {
          setError(t('passwordSameAsOldError'));
        } else {
          setError(t('passwordUpdateError'));
        }
      } else {
        setError(t('passwordUpdateError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>{t('resetPassword')}</CardTitle>
          <p className='text-center text-sm text-muted-foreground'>{t('resetPasswordDescription')}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Input type='password' placeholder={t('newPassword')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>

            <div className='space-y-2'>
              <Input type='password' placeholder={t('passwordConfirm')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {t('updating')}
                </>
              ) : (
                t('updatePasswordButton')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdatePassword;
