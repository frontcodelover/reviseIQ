import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/joy';
import { Trans } from 'react-i18next';
import { Brain } from 'lucide-react';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import SignupForm from '@/presentation/components/auth/signup/SignupForm';
import { Box, Container, Divider, Grid2, Paper } from '@mui/material';
function SignUp() {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 6, my: 8 }}>
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
                {t('auth.signup')}
              </Typography>

              <Typography color="secondary">
                <Trans i18nKey="auth.baseline" />
              </Typography>
            </Box>
          </Grid2>
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={4}>
            <OAuthLogin />
            <Divider>ou</Divider>
            <SignupForm />
          </Box>
        </Grid2>
      </Paper>
    </Container>
  );
}

export default SignUp;
