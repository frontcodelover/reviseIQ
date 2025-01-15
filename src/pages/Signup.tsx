import { useState } from 'react';
import { getBackend } from '@/services/backend';
import { useNavigate } from 'react-router-dom';
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
    isValid:
      minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  };
};

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const backend = getBackend();

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
    setPasswordTouched(true);
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    validateEmail(email) && passwordValidation.isValid && passwordsMatch;

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
  };

  return (
    <div className="container mx-auto max-w-sm p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Inscription</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form
        onSubmit={handleSignUp}
        className="rounded-lg bg-white p-6 shadow-md"
      >
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
            <p className="mt-1 text-sm text-red-500">
              Veuillez entrer une adresse email valide
            </p>
          )}
        </div>
       
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            Mot de passe
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
          <Label className="mb-2 block font-medium text-gray-700">
            Confirmer le mot de passe
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

        </div>
        <Button
          type="submit"
          disabled={loading || !isFormValid}
          className={`w-full rounded-lg px-4 py-2 font-medium text-white ${
            loading || !isFormValid
              ? 'cursor-not-allowed bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </Button>
		{confirmPasswordTouched && !passwordsMatch && (
            <p className="mt-1 text-sm text-red-500">
              Les mots de passe ne correspondent pas
            </p>
			  )}
			   {passwordTouched && (
            <div className="mt-2 text-sm">
              <p className="mb-1 font-medium">
                Le mot de passe doit contenir :
              </p>
              <ul className="space-y-1">
                <li
                  className={
                    passwordValidation.minLength
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  ✓ Au moins 6 caractères
                </li>
                <li
                  className={
                    passwordValidation.hasUpperCase
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  ✓ Une lettre majuscule
                </li>
                <li
                  className={
                    passwordValidation.hasLowerCase
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  ✓ Une lettre minuscule
                </li>
                <li
                  className={
                    passwordValidation.hasNumber
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  ✓ Un chiffre
                </li>
                <li
                  className={
                    passwordValidation.hasSpecialChar
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  ✓ Un caractère spécial (!@#$%^&amp;*(),.?":{}|&lt;&gt;)
                </li>
              </ul>
            </div>
          )}
		  </form>
    </div>
  );
}

export default SignUp;
