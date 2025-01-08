import FirstTimeForm from '@/components/dashboard/FirstTime';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FirstTimeFormPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    console.log('FirstTimeFormPage: handleFormSubmit called');
    try {
      localStorage.setItem('isFirstTime', 'false');
      navigate('/dashboard');
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  return (
    <div className="container mx-auto">
      {user && <FirstTimeForm user={user} onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default FirstTimeFormPage;
