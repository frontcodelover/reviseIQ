import { supabase } from '../services/supabaseClient';
import { useTranslation } from 'react-i18next';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
          onClick={() => changeLanguage('en')}
        >
          {t('english')}
        </button>
        <button
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
          onClick={() => changeLanguage('fr')}
        >
          {t('french')}
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-500">{t('welcome')}</h1>
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          {t('login')}
        </button>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleSignUp}
        >
          Test Signup
        </button>
      </div>
    </div>
  );
}

export default Home;
