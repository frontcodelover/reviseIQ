import { Cta } from '@/presentation/components/home/Cta';
import { Faq } from '@/presentation/components/home/Faq';
import { Features } from '@/presentation/components/home/Features';
import { Footer } from '@/presentation/components/home/Footer';
import { Hero } from '@/presentation/components/home/Hero';
import { Video } from '@/presentation/components/home/Video';
import { LanguageToggle } from '@/presentation/shared/LanguageToggle';
import { ModeToggle } from '@/presentation/shared/ModeToggle';
import { Brain } from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="relative m-auto flex min-h-[100vh] w-full flex-col items-center justify-center">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">{t('title')}</h1>
      </div>

      <div className="absolute right-4 top-4 z-50 flex gap-2">
        <ModeToggle />
        <LanguageToggle />
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
