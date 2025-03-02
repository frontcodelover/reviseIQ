import { useTranslations } from 'next-intl';
import HomePage from './(public)/Home';

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <HomePage />
    </main>
  );
}
