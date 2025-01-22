import styled from 'styled-components';
import FirstTimeForm from '@/presentation/components/firstTime/firstTime';
import { useAuth } from '@/presentation/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

  return <Container>{user && <FirstTimeForm user={user} onSubmit={handleFormSubmit} />}</Container>;
};

export default FirstTimeFormPage;
