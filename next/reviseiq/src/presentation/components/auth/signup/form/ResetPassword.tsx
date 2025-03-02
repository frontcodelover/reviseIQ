'use client';

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { LocaleLink } from '@/presentation/components/ui/locale-link';
import { useLocale } from 'next-intl';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'initial' | 'sent' | 'reset'>('initial');
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // ⚠️ Correction ici: utiliser "update-password" sans préfixe de locale
        // next-intl ajoutera automatiquement la locale
        window.location.href = `/update-password${window.location.hash}`;
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [locale]);

  const handleInitiateReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await appContainer.getAuthService().resetPassword(email);
      setStep('sent');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      setError(typeof error === 'object' && error !== null && 'message' in error ? String(error.message) : t('resetPasswordError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-6'>
          <div className='flex items-center justify-center gap-2 text-primary'>
            <Brain className='h-7 w-7' />
            <h2 className='text-2xl font-semibold'>{t('title')}</h2>
          </div>

          <div className='space-y-2 text-center'>
            <CardTitle className='text-2xl font-bold'>{t('resetPassword')}</CardTitle>
            <p className='text-sm text-muted-foreground'>{t('resetPasswordDescription')}</p>
          </div>
        </CardHeader>

        <CardContent>
          {step === 'initial' ? (
            <form onSubmit={handleInitiateReset} className='space-y-4'>
              <div className='space-y-2'>
                <Input type='email' placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full' disabled={loading} />
                {error && <p className='mt-2 text-sm text-destructive'>{error}</p>}
              </div>
              <div className='flex justify-center'>
                <Button type='submit' size='lg' className='min-w-[200px]' disabled={loading}>
                  {loading ? t('processing') : t('resetButton')}
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                <LocaleLink href='/login' className='text-primary hover:underline'>
                  {t('backToLogin')}
                </LocaleLink>
              </div>
            </form>
          ) : step === 'sent' ? (
            <div className='space-y-4'>
              <div className='rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20'>
                <p className='text-green-600 dark:text-green-400'>{t('emailSended')}</p>
              </div>
              <div className='mt-4 text-center'>
                <Button onClick={() => router.push('/login')} variant='outline'>
                  {t('backToLogin')}
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
