import styled from 'styled-components';
import Hero from '@/presentation/pages/home/Hero';
import { useTranslation } from 'react-i18next';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
      <Hero />
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
    </Container>
  );
}

export default Home;
