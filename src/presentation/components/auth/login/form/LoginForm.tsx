import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SignInWithEmailUseCase } from '@/application/useCases/SignInWithEmail.usecase';
import { SignInWithProviderUseCase } from '@/application/useCases/SignInWithProvider.usecase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authRepository = new SupabaseAuthRepository();
  const signInWithEmail = new SignInWithEmailUseCase(authRepository);
  const signInWithProvider = new SignInWithProviderUseCase(authRepository);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail.execute(email, password);
      navigate('/dashboard'); // Redirige après connexion
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container mx-auto max-w-sm p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="mb-4 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg px-4 py-2 font-medium text-white ${
            loading ? 'cursor-not-allowed bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleProviderLogin('google')}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Connexion avec Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
