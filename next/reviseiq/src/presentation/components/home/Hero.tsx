'use client';
import { Button } from '@/presentation/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { LocaleLink } from '../ui/locale-link';
import { useParams } from 'next/navigation';

export function Hero() {
  const t = useTranslations();
  const pathname = usePathname();
  const params = useParams();

  // Débogage - vérifier la configuration
  console.log('Pathname dans Hero:', pathname);
  console.log('Params dans Hero:', params);

  // ✅ Utiliser un lien sans préfixe pour tester
  const signupUrl = '/signup';
  console.log('URL de signup calculée:', signupUrl);

  return (
    <div className='my-20 h-full'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center justify-center gap-8 py-20 lg:py-40'>
          <div className='flex flex-col gap-4'>
            <h1 className='max-w-3xl text-center text-4xl font-semibold tracking-tighter md:text-6xl lg:text-7xl'>{t('home.title')}</h1>
            <p className='max-w-3xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl'>{t('home.description')}</p>
          </div>

          <div className='flex flex-row gap-3'>
            {/* ✅ Utiliser le lien sans préfixe */}
            <LocaleLink href={signupUrl}>
              <Button size='lg' className='gap-2 px-8 py-6 text-lg font-medium'>
                {t('home.cta')}
                <ArrowRight className='h-5 w-5' />
              </Button>
            </LocaleLink>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center rounded-full border bg-background p-1 shadow-sm'>
              <div className='flex -space-x-3'>
                <img
                  className='rounded-full object-cover ring-2 ring-background'
                  src='https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//anais.jpeg'
                  width={40}
                  height={40}
                  alt='Avatar 01'
                />
                <img
                  className='rounded-full object-cover ring-2 ring-background'
                  src='https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//jean.jpeg'
                  width={40}
                  height={40}
                  alt='Avatar 02'
                />
                <img
                  className='rounded-full object-cover ring-2 ring-background'
                  src='https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//jack.jpeg'
                  width={40}
                  height={40}
                  alt='Avatar 03'
                />
                <img
                  className='rounded-full object-cover ring-2 ring-background'
                  src='https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//charline.jpeg'
                  width={40}
                  height={40}
                  alt='Avatar 04'
                />
              </div>
              <Button
                variant='secondary'
                className='flex items-center justify-center rounded-full bg-transparent px-3 text-xs text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground'
              >
                +130
              </Button>
            </div>
            <p className='text-sm text-muted-foreground'>{t('home.community')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
