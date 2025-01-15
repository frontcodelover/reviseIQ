import { useState } from 'react';
import { getBackend } from '@/services/backend';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleHelp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const backend = getBackend();
  const { t } = useTranslation();

  const passwordValidation = validatePassword(password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValidation.isValid) {
      setError('Le mot de passe ne respecte pas les critères de sécurité');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await backend.signUp(email, password);
      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur lors de l'inscription");
      } else {
        setError("Erreur lors de l'inscription");
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
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              emailTouched && !validateEmail(email) ? 'border-red-500' : ''
            }`}
          />
          {emailTouched && !validateEmail(email) && (
            <p className="mt-1 text-sm text-red-500">Veuillez entrer une adresse email valide</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="mb-2 flex items-center gap-1 font-medium text-gray-700">
            {t('auth.password')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="h-4 w-4 font-light text-gray-700" />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
                  <p className="text-gray-600">{t('auth.content')}</p>
                  <ul className="space-y-1">
                    <li
                      className={passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}
                    >
                      ✓ {t('auth.minLength')}
                    </li>
                    <li
                      className={
                        passwordValidation.hasLowerCase ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      ✓ {t('auth.minLowercase')}
                    </li>
                    <li
                      className={
                        passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      ✓ {t('auth.minUppercase')}
                    </li>
                    <li
                      className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}
                    >
                      ✓ {t('auth.minNumber')}
                    </li>
                    <li
                      className={
                        passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      ✓ {t('auth.minSpecial')}
                    </li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">Confirmer le mot de passe</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              confirmPasswordTouched && !passwordsMatch ? 'border-red-500' : ''
            }`}
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
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
            J'accepte les{' '}
            <a href="#" className="text-blue-500">
              conditions d'utilisation
            </a>
          </Label>
        </div>
        <Button
          type="submit"
          disabled={loading || !isFormValid}
          className={`w-full rounded-lg mt-6 px-4 py-2 font-medium text-white ${
            loading || !isFormValid
              ? 'cursor-not-allowed bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Inscription...' : "S'inscrire gratuitement"}
        </Button>
        {confirmPasswordTouched && !passwordsMatch && (
          <p className="mt-1 text-sm text-red-500">Les mots de passe ne correspondent pas</p>
        )}
      </form>
      <Button
        className="mt-4 w-full rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
        onClick={() => navigate('/login')}
      >
        Vous avez déjà un compte ? Se connecter
      </Button>
    </div>
  );
}

export default SignupForm;
