import { useState } from 'react';
import { SignInWithProviderUseCase } from '@/application/useCases/auth/SignInWithProvider.usecase';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';

import { useTranslation } from 'react-i18next';
import Button from '@/presentation/components/ui/button/Button';

function OAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const authRepository = new SupabaseAuthRepository();
  const signInWithProvider = new SignInWithProviderUseCase(authRepository);

  const handleProviderLogin = async (provider: 'google') => {
    setLoading(true);
    setError('');
    try {
      await signInWithProvider.execute(provider);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || `Erreur lors de la connexion avec ${provider}`);
      } else {
        setError(`Erreur lors de la connexion avec ${provider}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={() => handleProviderLogin('google')} variant="primary" size="regular">
        {t('auth.signInWithGoogle')}
      </Button>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mb-4 text-sm text-gray-500">Chargement...</p>}
    </>
  );
}

export default OAuthLogin;
