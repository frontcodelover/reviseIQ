import socialProof from '@/assets/socialProof.png';
import wave from '@/assets/wave.png';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

function HeroTwo() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" sx={{ height: '80vh' }}>
      <SectionHero>
        <TitleGroup>
          <Typography
            variant="h1"
            fontWeight="bold"
            fontSize={{ xs: '3rem', md: '4rem', lg: '5rem' }}
            lineHeight={1}
          >
            <Trans
              i18nKey="home.title"
              components={{
                WaveImage: <WaveImage />,
              }}
            />
          </Typography>
        </TitleGroup>
        <Typography variant="body1" fontSize={{ xs: '1rem', md: '1.25rem' }} color="textSecondary">
          <Trans i18nKey="home.description" />
        </Typography>
        <Link to="/signup">
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={24} />}
            sx={{ px: 5, py: 1, fontSize: '1rem', textTransform: 'none', fontWeight: 'bold' }}
          >
            {t('home.cta')}
          </Button>
        </Link>
        <SocialContainer>
          <SocialProof src={socialProof} alt="Social proof" />
          <Typography variant="body2" color="textSecondary">
            {t('home.community')}
          </Typography>
        </SocialContainer>
      </SectionHero>
    </Container>
  );
}

const SectionHero = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  textAlign: 'center',
  height: '80vh',
}));

const TitleGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  lineHeight: 1,
}));

const SocialContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const SocialProof = styled('img')({
  width: 'auto',
  maxWidth: '100%',
});

const WaveImage = styled('span')({
  width: 'auto',
  backgroundImage: `url(${wave})`,
  backgroundSize: 'contain',
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat',
  padding: '0 0 1rem 0',
  display: 'inline-block',
  margin: '0 0.5rem',
  lineHeight: 1,
});

export default HeroTwo;
