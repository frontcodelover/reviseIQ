import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button, Typography, CircularProgress, SvgIcon, Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function OAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleProviderLogin = async (provider: 'google') => {
    setLoading(true);
    setError('');
    try {
      // await appContainer.SignInWithProvider().execute(provider);
      await appContainer.getAuthService().signInWithProvider(provider);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || `Erreur lors de la connexion avec ${provider}`);
      } else {
        setError(`Erreur lors de la connexion avec ${provider}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleProviderLogin('google')}
        disabled={loading}
        size="large"
        sx={{
          width: '100%',
          fontWeight: 'bold',
          backgroundColor: 'primary.dark',
          color: 'contrastText',
          textTransform: 'none',
        }}
        startIcon={
          <SvgIcon>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
                fill="#fff"
              />
              <path
                d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
                fill="#fff"
              />
              <path
                d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
                fill="#fff"
              />
              <path
                d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
                fill="#fff"
              />
            </svg>
          </SvgIcon>
        }
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.signInWithGoogle')}
      </Button>
      {error && (
        <Typography color="error" mt={2} textAlign="center">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default OAuthLogin;
