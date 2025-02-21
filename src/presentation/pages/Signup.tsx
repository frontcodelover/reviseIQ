import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import SignupForm from '@/presentation/components/auth/signup/SignupForm';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation();

  return (
    <main className="container mx-auto max-w-3xl px-4">
      <Card className="mt-8 p-12">
        <div className="grid justify-center gap-6">
          <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Brain size={28} />
              <h2 className="text-2xl font-semibold">{t('title')}</h2>
            </div>

            <h1 className="mt-6 text-3xl font-bold">{t('auth.signup')}</h1>

            <p className="text-muted-foreground">
              <Trans i18nKey="auth.baseline" />
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <OAuthLogin />
            <div className="relative flex w-full items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-muted-foreground">{t('auth.or')}</span>
              <Separator className="flex-1" />
            </div>
            <SignupForm />
          </div>
        </div>
      </Card>
    </main>
  );
}

export default SignUp;
