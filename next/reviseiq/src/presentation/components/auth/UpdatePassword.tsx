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
import { useRouter } from 'next/navigation';

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Remplacer useNavigate par useRouter
  const { isPasswordRecovery } = useAuth();
  const t = useTranslations();

  useEffect(() => {
    if (!isPasswordRecovery) {
      router.push('/login'); // ✅ Utiliser router.push au lieu de navigate
    }
  }, [isPasswordRecovery, router]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return t('auth.passwordLengthError');
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
      setError(t('auth.passwordMismatchError'));
      setLoading(false);
      return;
    }

    try {
      await appContainer.getAuthService().updateUserPassword(newPassword);
      localStorage.removeItem('passwordRecoveryMode');
      await supabase.auth.signOut();
      router.push('/login'); // ✅ Utiliser router.push au lieu de navigate
    } catch (err) {
      console.error('Erreur mise à jour mot de passe:', err);
      setError(t('auth.passwordUpdateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>{t('auth.resetPassword')}</CardTitle>
          <p className='text-center text-sm text-muted-foreground'>{t('auth.resetPasswordDescription')}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Input type='password' placeholder={t('auth.newPassword')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>

            <div className='space-y-2'>
              <Input type='password' placeholder={t('auth.passwordConfirm')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
                  {t('auth.updating')}
                </>
              ) : (
                t('auth.updatePasswordButton')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdatePassword;
