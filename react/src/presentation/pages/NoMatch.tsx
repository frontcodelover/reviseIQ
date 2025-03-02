import { Button } from '@/presentation/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function NoMatch() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background">
      <h1 className="text-6xl font-bold text-primary">{t('notfound.title')}</h1>
      <p className="text-2xl text-muted-foreground">{t('notfound.message')}</p>
      <Link to="/">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-primary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {t('notfound.back')}
        </Button>
      </Link>
    </div>
  );
}

export default NoMatch;
