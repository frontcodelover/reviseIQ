import { appContainer } from '@/infrastructure/config/AppContainer';
import { PasswordTooltip } from '@/presentation/components/auth/signup/form/PasswordTooltip';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  };
};

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    validateEmail(email) && passwordValidation.isValid && passwordsMatch && termsAccepted;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValidation.isValid) {
      setError(t('auth.passwordInvalid'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await appContainer.getAuthService().signUp(email, password);
      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || t('auth.errorSignup'));
      } else {
        setError(t('auth.errorSignup'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        margin: '0 auto',
        gap: 1,
        padding: 2,
      }}
    >
      <TextField
        label={t('auth.email')}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailTouched(true);
        }}
        disabled={loading}
        variant="outlined"
        margin="normal"
        required
        error={emailTouched && !validateEmail(email)}
        helperText={emailTouched && !validateEmail(email) ? t('auth.emailInvalid') : ''}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'end' }}>
        <PasswordTooltip validation={passwordValidation} />
      </Box>
      <TextField
        label={t('auth.password')}
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label={t('auth.passwordConfirm')}
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordTouched(true);
        }}
        disabled={loading}
        variant="outlined"
        margin="normal"
        required
        error={confirmPasswordTouched && !passwordsMatch}
        helperText={confirmPasswordTouched && !passwordsMatch ? t('auth.passwordMatch') : ''}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            name="terms"
            color="primary"
            required
          />
        }
        label={
          <Typography variant="body2">
            {t('auth.acceptTerms')} <Link to="#">{t('auth.terms')}</Link>
          </Typography>
        }
      />

      {error && (
        <Typography variant="body2" color="error" mb={2}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading || !isFormValid}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: 'primary.dark',
          color: '#fff',
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.cta')}
      </Button>
      <Button
        fullWidth
        onClick={() => navigate('/login')}
        disabled={loading}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: 'grey.300',
          color: 'grey.900',
        }}
      >
        {t('auth.alreadySignup')}
      </Button>
    </Box>
  );
}

export default SignupForm;
