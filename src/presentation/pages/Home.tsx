import Hero from '@/presentation/pages/home/Hero';
import { supabase } from '@/infrasctructure/backend/SupabaseClient';
import { useTranslation } from 'react-i18next';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';

function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });

    if (error) {
      console.error('Erreur de connexion:', error.message);
      alert('Erreur de connexion: ' + error.message);
    } else {
      console.log('Utilisateur connecté:', data.user);
    }
    console.log('Token :', data.session?.access_token);
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    if (error) {
      console.error("Erreur d'inscription:", error.message);
      alert("Erreur d'inscription: " + error.message);
    } else {
      console.log('Inscription réussie:', data);
      alert("Vérifiez votre email pour confirmer l'inscription!");
    }
  };

  return (
    <div>
      <Hero />
      <div className="absolute right-4 top-4 z-50 flex gap-2">
        <button
          className="flex items-center gap-2 rounded border bg-white px-3 py-1 text-sm hover:bg-gray-100"
          onClick={() => changeLanguage('en')}
        >
          {t('english')}
          <US title="United States" className="w-5" />
        </button>
        <button
          className="flex items-center gap-2 rounded border bg-white px-3 py-1 text-sm hover:bg-gray-100"
          onClick={() => changeLanguage('fr')}
        >
          {t('french')}
          <FR title="United States" className="w-5" />
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-500">{t('welcome')}</h1>
      <div className="mt-4 flex gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleLogin}
        >
          {t('login')}
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleSignUp}
        >
          Test Signup
        </button>
      </div>
    </div>
  );
}

export default Home;
