import { Button } from '@/presentation/components/ui/button';
import { Hero } from '@/presentation/pages/home/Hero';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Cta } from './home/Cta';
import { Faq } from './home/Faq';
import { Features } from './home/Features';
import { Footer } from './home/Footer';
import { Video } from './home/Video';

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative m-auto flex min-h-[100vh] w-full flex-col items-center justify-center">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">{t('title')}</h1>
      </div>

      <div className="absolute right-4 top-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => changeLanguage('en')}
          className="flex items-center gap-2 transition-colors hover:bg-muted"
        >
          {t('english')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => changeLanguage('fr')}
          className="flex items-center gap-2 transition-colors hover:bg-muted"
        >
          {t('french')}
        </Button>
      </div>

      {/* Main Content */}
      <main className="container mx-auto space-y-12 px-4">
        <Hero />
        <Video />
        <Features />
      </main>
      <Cta />
      <Faq />
      <Footer />
    </div>
  );
}
