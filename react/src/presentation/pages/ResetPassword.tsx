import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'initial' | 'sent' | 'reset'>('initial');
  const { t } = useTranslation();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStep('reset');
      }
    });
  }, []);

  const handleInitiateReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appContainer.getAuthService().resetPassword(email);
      setStep('sent');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Brain className="h-7 w-7" />
            <h2 className="text-2xl font-semibold">{t('title')}</h2>
          </div>

          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">{t('auth.resetPassword')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('auth.resetPasswordDescription')}</p>
          </div>
        </CardHeader>

        <CardContent>
          {step === 'initial' ? (
            <form onSubmit={handleInitiateReset} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" size="lg" className="min-w-[200px]">
                  {t('auth.resetButton')}
                </Button>
              </div>
            </form>
          ) : step === 'sent' ? (
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
              <p className="text-green-600 dark:text-green-400">{t('auth.emailSended')}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
