import styled from 'styled-components';
import FirstTimeForm from '@/presentation/components/firstTime/firstTime';
import { useAuth } from '@/presentation/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  --dot-bg: #007868;
  --dot-color: #fff;
  --dot-size: 1px;
  --dot-space: 50px;
  background:
    linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%)
      center / var(--dot-space) var(--dot-space),
    linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center /
      var(--dot-space) var(--dot-space),
    var(--dot-color);
  margin: 0 auto;
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
