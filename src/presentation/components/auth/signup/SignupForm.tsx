import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SignUpUseCase } from '@/application/useCases/SignUp.usecase';
import { SupabaseAuthRepository } from '@/infrasctructure/backend/SupabaseAuthRepository';

import { EmailInput } from '@/presentation/components/auth/signup/form/EmailInput';
import { PasswordTooltip } from '@/presentation/components/auth/signup/form/PasswordTooltip';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  };
};

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const authRepository = new SupabaseAuthRepository();
  const signUpUseCase = new SignUpUseCase(authRepository);

  const { t } = useTranslation();

  const passwordValidation = validatePassword(password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValidation.isValid) {
      setError(t('auth.passwordInvalid'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUpUseCase.execute(email, password);
      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || t('auth.errorSignup'));
      } else {
        setError(t('auth.errorSignup'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid = validateEmail(email) && passwordValidation.isValid && passwordsMatch;

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
  };

  return (
    <div>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSignUp}>
        <EmailInput
          email={email}
          onChange={handleEmailChange}
          touched={emailTouched}
          isValid={validateEmail(email)}
        />

        <div className="mb-4">
          <PasswordTooltip validation={passwordValidation} />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            {t('auth.passwordConfirm')}
          </Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              confirmPasswordTouched && !passwordsMatch ? 'border-red-500' : ''
            }`}
          />
          {confirmPasswordTouched && !passwordsMatch && (
            <p className="mt-1 text-sm text-red-500">{t('auth.passwordMatch')}</p>
          )}
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Input
            className="h-4 w-4 focus:ring-0 focus:ring-gray-500"
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <Label>
            {t('auth.acceptTerms')}{' '}
            <a href="#" className="text-blue-500">
              {t('auth.terms')}{' '}
            </a>
          </Label>
        </div>
        <Button
          type="submit"
          disabled={loading || !isFormValid}
          className={`mt-6 w-full rounded-lg px-4 py-2 font-medium text-white ${
            loading || !isFormValid
              ? 'cursor-not-allowed bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? t('auth.loading') : t('auth.cta')}
        </Button>
      </form>
      <Button
        className="mt-4 w-full rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
        onClick={() => navigate('/login')}
      >
        {t('auth.alreadySignup')}
      </Button>
    </div>
  );
}

export default SignupForm;
