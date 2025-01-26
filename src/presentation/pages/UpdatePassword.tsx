import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { ResetPasswordUseCase } from '@/application/useCases/ResetPassword.usecase';
import { useAuth } from '@/presentation/context/AuthContext';

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isPasswordRecovery } = useAuth();

  const authRepository = new SupabaseAuthRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);

  useEffect(() => {
    if (!isPasswordRecovery) {
      navigate('/login');
    }
  }, [isPasswordRecovery, navigate]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation du mot de passe
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      await resetPasswordUseCase.updatePassword(newPassword);
      // Nettoyer l'état de récupération
      localStorage.removeItem('passwordRecoveryMode');
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur mise à jour mot de passe:', error);
      setError("Le nouveau mot de passe ne doit pas être identique à l'ancien.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Modifier votre mot de passe
        </h2>

        {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
}
