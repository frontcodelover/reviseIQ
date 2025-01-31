import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/presentation/context/AuthContext';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { SignInWithEmailUseCase } from '@/application/useCases/auth/SignInWithEmail.usecase';
import Button from '@/presentation/components/ui/button/Button';
import { useTranslation } from 'react-i18next';

const InputField = styled.div`
  width: 100%;
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 8px;
    color: #555;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  font-size: 12px;
  color: #007bff;
  text-decoration: none;
  text-align: right;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, hasProfile, checkSession } = useAuth();
  const navigate = useNavigate();

  const authRepository = new SupabaseAuthRepository();
  const signInWithEmail = new SignInWithEmailUseCase(authRepository);

  useEffect(() => {
    if (user && !hasProfile) {
      navigate('/first-time');
    }
  }, [user, hasProfile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail.execute(email, password);
      await checkSession(false, true);
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

  return (
    <div>
      <form onSubmit={handleLogin}>
        <InputField>
          <label>{t('auth.email')}</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </InputField>
        <InputField>
          <label>{t('auth.password')}</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </InputField>
        <ForgotPasswordLink href="/reset-password">{t('auth.forgotPassword')}</ForgotPasswordLink>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <Button size="regular" variant="primary" type="submit" disabled={loading}>
          {loading ? t('loading') : t('auth.login')}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
