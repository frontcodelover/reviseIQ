import SignupForm from '@/components/auth/signup/signupForm';
import Cover from '@/assets/learn-min.jpg';

function SignUp() {
  return (
    <div>
      <div className="grid h-screen w-screen md:grid-cols-2 items-center justify-evenly">
        <div className="h-full w-full bg-red-200 md:block hidden">
          <img
            src={Cover}
            alt="cover"
            className="h-full w-full -scale-x-100 transform object-cover object-right"
          />
        </div>
        <div className="flex h-full flex-col justify-center gap-10 bg-white md:p-20 p-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-3xl font-bold text-gray-800">S'insrire gratuitement</h2>
            <p className="text-balance text-center text-base text-gray-500">
              Rejoignez ReviseIQ et commencez à réviser en toute simplicité grâce à notre
              plateforme.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
