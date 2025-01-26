import LoginForm from '@/presentation/components/auth/login/form/LoginForm';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cover from '@/assets/learn-min.jpg';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import HeadingTwo from '../components/ui/text/heading/HeadingTwo';
import HeadingOne from '../components/ui/text/heading/HeadingOne';

const PageContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CoverContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  background-color: #fecaca;

  @media (min-width: 768px) {
    display: block;
  }
`;

const CoverImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: right;
  transform: scaleX(-1);
`;

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  background-color: white;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  font-size: 14px;
  color: #666;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
    margin: 0 8px;
  }
`;

function Login() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <CoverContainer>
        <CoverImage src={Cover} alt="cover" />
      </CoverContainer>
      <FormContainer>
        <HeaderContainer>
          <HeadingOne align="center" size="xlarge" weight="semibold" color="primary">
            {t('auth.login')}
          </HeadingOne>
          <HeadingTwo align="center" size="medium" weight="regular">
            {t('auth.baseline')}
          </HeadingTwo>
        </HeaderContainer>
        <FormSection>
          <OAuthLogin />
          <OrDivider> ou </OrDivider>
          <LoginForm />
        </FormSection>
      </FormContainer>
    </PageContainer>
  );
}

export default Login;
