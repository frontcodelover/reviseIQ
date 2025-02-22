import { FirstTimeForm } from '@/presentation/components/firstTime/FirstTime.form';
import { useAuth } from '@/presentation/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FirstTime() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = async (success: boolean) => {
    if (success) {
      try {
        localStorage.setItem('isFirstTime', 'false');
        navigate('/dashboard', { replace: true });

        if (location.pathname !== '/dashboard') {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background"
      style={{
        backgroundImage: `
          linear-gradient(90deg, var(--bgAuth) 49px, transparent 1%),
          linear-gradient(var(--bgAuth) 49px, transparent 1%)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: 'center',
      }}
    >
      {user && <FirstTimeForm user={user} onSubmit={handleFormSubmit} />}
    </div>
  );
}
