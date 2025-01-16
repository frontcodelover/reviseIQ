import SignupForm from '@/presentation/components/auth/signup/SignupForm';
import Cover from '@/assets/learn-min.jpg';
import { useTranslation } from 'react-i18next';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import { Separator } from '@/components/ui/separator';

function SignUp() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="grid h-screen w-screen items-center justify-evenly md:grid-cols-2">
        <div className="hidden h-full w-full bg-red-200 md:block">
          <img
            src={Cover}
            alt="cover"
            className="h-full w-full -scale-x-100 transform object-cover object-right"
          />
        </div>
        <div className="flex h-full flex-col justify-center gap-10 bg-white p-8 md:p-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-3xl font-bold text-gray-800">{t('auth.signup')}</h2>
            <p className="text-balance text-center text-base text-gray-500">{t('auth.baseline')}</p>
          </div>
          <div className="flex flex-col gap-6">
            <OAuthLogin />
            <Separator className="mx-auto" />
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
