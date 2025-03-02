import LoginForm from '@/presentation/components/auth/login/form/LoginForm';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import { Card } from '@/presentation/components/ui/card';
import { Separator } from '@/presentation/components/ui/separator';
import { Brain } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Login() {
  const t = useTranslations();

  return (
    <main className='container mx-auto max-w-3xl px-4'>
      <Card className='mt-8 p-12'>
        <div className='grid justify-center gap-6'>
          <div className='flex flex-col gap-4 text-center'>
            <div className='flex items-center justify-center gap-2 text-primary'>
              <Brain size={28} />
              <h2 className='text-2xl font-semibold'>{t('title')}</h2>
            </div>

            <h1 className='mt-6 text-3xl font-bold'>{t('auth.login')}</h1>

            <p className='text-muted-foreground'>{t('auth.baseline')}</p>
          </div>

          <div className='flex flex-col items-center gap-8'>
            <OAuthLogin />
            <div className='relative flex w-full items-center'>
              <Separator className='flex-1' />
              <span className='px-4 text-sm text-muted-foreground'>{t('auth.or')}</span>
              <Separator className='flex-1' />
            </div>
            <LoginForm />
          </div>
        </div>
      </Card>
    </main>
  );
}

export default Login;
