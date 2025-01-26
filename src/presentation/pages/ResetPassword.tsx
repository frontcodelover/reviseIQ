import { useState, useEffect } from 'react';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { ResetPasswordUseCase } from '@/application/useCases/ResetPassword.usecase';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'initial' | 'sent' | 'reset'>('initial');

  const authRepository = new SupabaseAuthRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStep('reset');
      }
    });
  }, []);

  const handleInitiateReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPasswordUseCase.initiateReset(email);
      setStep('sent');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {step === 'initial' && (
        <form onSubmit={handleInitiateReset} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded border p-2"
          />
          <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
            Réinitialiser le mot de passe
          </button>
        </form>
      )}

      {step === 'sent' && (
        <p>Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte mail.</p>
      )}
    </div>
  );
}
