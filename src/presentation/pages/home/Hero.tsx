import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import learn from '@/assets/learn-min.jpg';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="relative h-screen w-full" id="home">
      <div className="absolute inset-0 opacity-60">
        <img
          src={learn}
          alt="Background Image"
          className="h-full w-full object-cover object-right-top"
        />
      </div>
      <div className="absolute inset-9 flex flex-col items-center justify-center md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0 md:w-1/2">
          <h1 className="text-grey-700 mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="font-regular mb-8 mt-2 text-balance text-xl">{t('home.description')}</p>
          <Button>{t('home.cta')}</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
