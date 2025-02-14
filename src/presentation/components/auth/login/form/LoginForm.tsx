import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { TextField, Button, Link, Typography, CircularProgress, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, hasProfile, checkSession } = useAuth();
  const navigate = useNavigate();

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
      await appContainer.getAuthService().signInWithEmail(email, password);
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
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        margin: '0 auto',
        gap: 2,
        padding: 3,
      }}
    >
      <TextField
        label={t('auth.email')}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label={t('auth.password')}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        variant="outlined"
        margin="normal"
        required
      />
      <Link href="/reset-password" variant="body2" textAlign="right">
        {t('auth.forgotPassword')}
      </Link>
      {error && (
        <Typography variant="body2" color="error" mb={2}>
          {t('auth.invalid')}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: 'primary.dark',
          color: '#fff',
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.login')}
      </Button>
    </Box>
  );
}

export default LoginForm;
