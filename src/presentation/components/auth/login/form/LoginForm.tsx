import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Link, Typography, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
function LoginForm() {
  const { t } = useTranslation();
  const { user, hasProfile, checkSession } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const errors = errorMessage || formState.errors.email || formState.errors.password;

  useEffect(() => {
    if (user && !hasProfile) {
      navigate('/first-time');
    }
  }, [user, hasProfile, navigate]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({ email, password }) => {
    try {
      await appContainer.getAuthService().signInWithEmail(email, password);
      await checkSession(false, true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Erreur lors de la connexion');
      } else {
        setErrorMessage('Erreur lors de la connexion');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        margin: '0 auto',
        gap: 2,
        padding: 3,
      }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label={t('auth.email')}
            type="email"
            autoComplete="email"
            disabled={formState.isLoading}
            variant="outlined"
            margin="normal"
            required
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label={t('auth.password')}
            type="password"
            autoComplete="current-password"
            disabled={formState.isLoading}
            variant="outlined"
            margin="normal"
            required
            {...field}
          />
        )}
      />

      <Link href="/reset-password" variant="body2" textAlign="right">
        {t('auth.forgotPassword')}
      </Link>
      {errors && (
        <Typography variant="body2" color="error" mb={2}>
          {t('auth.invalid')}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={formState.isLoading}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: 'primary.dark',
          color: '#fff',
        }}
      >
        {formState.isLoading ? <CircularProgress size={24} color="inherit" /> : t('auth.login')}
      </Button>
    </Box>
  );
}

export default LoginForm;
