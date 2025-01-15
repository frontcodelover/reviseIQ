import { useState } from 'react';
import { getBackend } from '@/services/backend';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function OAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backend = getBackend();

	const { t } = useTranslation();
	
  const handleProviderLogin = async (provider: 'google') => {
    setLoading(true);
    setError('');
    try {
      await backend.signInWithProvider(provider);
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
      <Button
        onClick={() => handleProviderLogin('google')}
        className="rounded-lg shadow-none bg-indigo-500 p-6 border-2 text-white hover:bg-indigo-600 w-full"
      >
		{t('auth.signInWithGoogle')}
      </Button>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mb-4 text-sm text-gray-500">Chargement...</p>}
    </>
  );
}

export default OAuthLogin;
