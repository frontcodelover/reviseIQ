import { useState } from 'react';
import { getBackend } from '@/services/backend';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backend = getBackend();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await backend.signUp(email, password);
      navigate('/login'); // Redirige après inscription
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

  return (
    <div className="container mx-auto max-w-sm p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Inscription</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form
        onSubmit={handleSignUp}
        className="rounded-lg bg-white p-6 shadow-md"
      >
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
          <label className="mb-2 block font-medium text-gray-700">
            Mot de passe
          </label>
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
            loading
              ? 'cursor-not-allowed bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
