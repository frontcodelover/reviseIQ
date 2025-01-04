import { useState } from 'react';
import { signInWithEmail, signInWithProvider } from '@/services/backend/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
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
      await signInWithProvider(provider);
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
    <div className="container mx-auto p-6 max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleProviderLogin('google')}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Connexion avec Google
        </button>
        
      </div>
    </div>
  );
}

export default Login;
