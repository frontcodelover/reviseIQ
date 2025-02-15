import { ResetPasswordUseCase } from '@/application/useCases/auth/ResetPassword.usecase';
import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { Typography } from '@mui/joy';
import { Box, Container, Paper, TextField, Button, Grid2 } from '@mui/material';
import { Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'initial' | 'sent' | 'reset'>('initial');
  const { t } = useTranslation();

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
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 6, mt: 8 }}>
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 size={12}>
            <Box textAlign="center" display={'flex'} flexDirection={'column'} gap={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                sx={{ color: '#007867' }}
              >
                <Brain size={28} />
                <Typography level="h2" color="secondary">
                  {t('title')}
                </Typography>
              </Box>

              <Typography level="h1" color="secondary" sx={{ mt: 3 }}>
                {t('auth.resetPassword')}
              </Typography>

              <Typography color="secondary">{t('auth.resetPasswordDescription')}</Typography>
            </Box>
          </Grid2>
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={4}>
            {step === 'initial' && (
              <form onSubmit={handleInitiateReset}>
                <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={4}>
                  <TextField
                    label={t('email')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      backgroundColor: 'primary.dark',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      margin: 'auto',
                      width: 'fit-content',
                    }}
                  >
                    {t('auth.resetButton')}
                  </Button>
                </Box>
              </form>
            )}
            {step === 'sent' && (
              <Grid2 size={12}>
                <Typography color="success">{t('auth.emailSended')}</Typography>
              </Grid2>
            )}
          </Box>
        </Grid2>
      </Paper>
    </Container>
  );
}
