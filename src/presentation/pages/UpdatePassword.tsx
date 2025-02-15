import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid2,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isPasswordRecovery } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isPasswordRecovery) {
      navigate('/login');
    }
  }, [isPasswordRecovery, navigate]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return t('auth.passwordLengthError');
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('auth.passwordMismatchError'));
      setLoading(false);
      return;
    }

    try {
      await appContainer.getAuthService().updateUserPassword(newPassword);
      localStorage.removeItem('passwordRecoveryMode');
      await supabase.auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Erreur mise à jour mot de passe:', err);
      setError(t('auth.passwordUpdateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 size={12}>
            <Box textAlign="center">
              <Typography component="h1" variant="h5">
                {t('auth.resetPassword')}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={12}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label={t('auth.newPassword')}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label={t('auth.passwordConfirm')}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                />

                {error && (
                  <Typography variant="body2" color="error" textAlign="center">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t('auth.updatePasswordButton')
                  )}
                </Button>
              </Box>
            </form>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
