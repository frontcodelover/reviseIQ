import styled from 'styled-components';
import { Brain } from 'lucide-react';
import HeroTwo from './home/Hero';
import { useTranslation } from 'react-i18next';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
    justify-content: flex-start;
  }
`;

const Logo = styled.h1`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  top: 1rem;
  left: 1rem;
  font-size: 1.5rem;
  color: #0077ff;
  font-weight: 600;
`;

const LanguageContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 50;
  display: flex;
  gap: 0.5rem;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      <Logo>
        <Brain />
        ReviseIQ
      </Logo>
      <LanguageContainer>
        <LanguageButton onClick={() => changeLanguage('en')}>
          {t('english')}
          <US style={{ width: '1.25rem', height: 'auto' }} title="United States" />
        </LanguageButton>
        <LanguageButton onClick={() => changeLanguage('fr')}>
          {t('french')}
          <FR style={{ width: '1.25rem', height: 'auto' }} title="France" />
        </LanguageButton>
      </LanguageContainer>
      <HeroTwo />
    </Container>
  );
}

export default Home;
