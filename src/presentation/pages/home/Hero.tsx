import wave from '@/assets/wave.png';
import { Button } from '@/presentation/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="my-20 h-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-3xl text-center text-4xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">
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
            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              <Trans i18nKey="home.description" />
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Link to="/signup">
              <Button size="lg" className="gap-2 px-8 py-6 text-lg font-medium">
                {t('home.cta')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border bg-background p-1 shadow-sm">
              <div className="flex -space-x-3">
                <img
                  className="rounded-full object-cover ring-2 ring-background"
                  src="https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//anais.jpeg"
                  width={40}
                  height={40}
                  alt="Avatar 01"
                />
                <img
                  className="rounded-full object-cover ring-2 ring-background"
                  src="https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//jean.jpeg"
                  width={40}
                  height={40}
                  alt="Avatar 02"
                />
                <img
                  className="rounded-full object-cover ring-2 ring-background"
                  src="https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//jack.jpeg"
                  width={40}
                  height={40}
                  alt="Avatar 03"
                />
                <img
                  className="rounded-full object-cover ring-2 ring-background"
                  src="https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//charline.jpeg"
                  width={40}
                  height={40}
                  alt="Avatar 04"
                />
              </div>
              <Button
                variant="secondary"
                className="flex items-center justify-center rounded-full bg-transparent px-3 text-xs text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
              >
                +130
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{t('home.community')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
