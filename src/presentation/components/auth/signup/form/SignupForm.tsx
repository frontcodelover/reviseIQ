import { appContainer } from '@/infrastructure/config/AppContainer';
import { validatePassword } from '@/lib/ValidatePassword';
import { PasswordTooltip } from '@/presentation/components/auth/signup/form/PasswordTooltip';
import { formSchema } from '@/presentation/components/auth/signup/form/SignupForm.schema';
import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert';
import { Button } from '@/presentation/components/ui/button';
import { Checkbox } from '@/presentation/components/ui/checkbox';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';

function SignupForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { handleSubmit, control, formState, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const password = watch('password');
  const passwordValidation = validatePassword(password);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await appContainer.getAuthService().signUp(data.email, data.password);
      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur lors de l'inscription");
      } else {
        setError("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  autoComplete="email"
                  disabled={formState.isSubmitting}
                  aria-invalid={!!formState.errors.email}
                  className={formState.errors.email ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <PasswordTooltip validation={passwordValidation} />
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  autoComplete="new-password"
                  disabled={formState.isSubmitting}
                  aria-invalid={!!formState.errors.password}
                  className={formState.errors.password ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword">{t('auth.passwordConfirm')}</Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  autoComplete="new-password"
                  disabled={formState.isSubmitting}
                  aria-invalid={!!formState.errors.confirmPassword}
                  className={formState.errors.confirmPassword ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={!!formState.errors.terms}
                />
              )}
            />
            <Label htmlFor="terms" className="text-sm">
              {t('auth.acceptTerms')}{' '}
              <Link to="#" className="underline underline-offset-4">
                {t('auth.terms')}
              </Link>
            </Label>
          </div>
          {formState.errors.terms && (
            <p className="mt-1 text-sm text-destructive">{formState.errors.terms.message}</p>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              t('auth.cta')
            )}
          </Button>
          <div className="mt-8 text-center text-sm">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="underline underline-offset-4">
              {t('auth.login')}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
