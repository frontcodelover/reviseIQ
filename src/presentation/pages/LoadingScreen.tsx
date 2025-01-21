import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #0077ff;
  border-bottom-color: #0077ff;
  animation: ${spin} 1s linear infinite;
`;

const LoadingScreen = () => (
  <Container>
    <Spinner />
  </Container>
);

export default LoadingScreen;
