import socialProof from '@/assets/socialProof.png';
import wave from '@/assets/wave.png';
import { Button } from '@/presentation/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto min-h-[80vh]">
      <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <Trans
              i18nKey="home.title"
              components={{
                WaveImage: (
                  <span
                    className="mx-2 inline-block bg-contain bg-left-bottom bg-no-repeat pb-4"
                    style={{ backgroundImage: `url(${wave})` }}
                  />
                ),
              }}
            />
          </h1>
        </div>

        <p className="text-balance text-lg text-muted-foreground md:text-xl">
          <Trans i18nKey="home.description" />
        </p>

        <Link to="/signup">
          <Button size="lg" className="px-8 py-6 text-lg font-bold">
            {t('home.cta')}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <img src={socialProof} alt="Social proof" className="h-auto w-auto max-w-full" />
          <p className="text-sm text-muted-foreground">{t('home.community')}</p>
        </div>
      </section>
    </div>
  );
}
