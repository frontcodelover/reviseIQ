import styled from 'styled-components';

function NoMatch() {
  return (
    <Container>
      <ErrorText>Erreur 404</ErrorText>
      <StyledLink href="/">Retour à l'accueil</StyledLink>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8fafc;
  gap: 2rem;
`;

const ErrorText = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #0077ff;
  margin: 0;
`;

const StyledLink = styled.a`
  color: #64748b;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border: 2px solid #0077ff;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0077ff;
    color: white;
  }
`;

export default NoMatch;
