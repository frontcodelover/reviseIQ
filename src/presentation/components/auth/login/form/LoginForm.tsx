import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
function LoginForm() {
  const { t } = useTranslation();
  const { user, hasProfile, checkSession } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const errors = errorMessage || formState.errors.email || formState.errors.password;

  useEffect(() => {
    if (user && !hasProfile) {
      navigate('/first-time');
    }
  }, [user, hasProfile, navigate]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({ email, password }) => {
    try {
      await appContainer.getAuthService().signInWithEmail(email, password);
      await checkSession(false, true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Erreur lors de la connexion');
      } else {
        setErrorMessage('Erreur lors de la connexion');
      }
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            {' '}
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  autoComplete="email"
                  disabled={formState.isLoading}
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  autoComplete="current-password"
                  disabled={formState.isLoading}
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className="text-right text-sm">
            <Link to="/reset-password" className='underline-offset-4" underline'>
              {t('auth.forgotPassword')}
            </Link>
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button className="w-full" type="submit" disabled={formState.isLoading}>
            {t('auth.login')}
          </Button>
        </div>

        {errors && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ooops</AlertTitle>
            <AlertDescription>{t('auth.invalid')}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center text-sm">
          {t('auth.dontHaveAccount')}{' '}
          <Link to="/signup" className="underline underline-offset-4">
            {t('auth.signup')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
