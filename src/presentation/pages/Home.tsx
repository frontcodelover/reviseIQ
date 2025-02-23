import { Button } from '@/presentation/components/ui/button';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import HeroTwo from './home/Hero';
import Section from './home/Section';

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold text-primary">{t('title')}</h1>
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
        <HeroTwo />
        <Section />
      </main>
    </div>
  );
}
