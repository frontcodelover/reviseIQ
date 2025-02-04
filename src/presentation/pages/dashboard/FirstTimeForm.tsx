import styled from 'styled-components';
import FirstTimeForm from '@/presentation/components/firstTime/firstTime';
import { useAuth } from '@/presentation/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #e0e7ff;
`;

const FirstTimeFormPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Ajouter useLocation

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

  return <Container>{user && <FirstTimeForm user={user} onSubmit={handleFormSubmit} />}</Container>;
};

export default FirstTimeFormPage;
