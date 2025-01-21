import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cover from '@/assets/learn-min.jpg';
import OAuthLogin from '@/presentation/components/auth/provider/OAuthLogin';
import SignupForm from '@/presentation/components/auth/signup/SignupForm';

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

const Title = styled.h1`
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: #0077ff;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 1rem;
  color: #8a8a8a;
  text-wrap: balance;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Separator = styled.div`
  border: 0.1px solid;
  border-color: #8a8a8a;
  width: 100%;
`;

function SignUp() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <CoverContainer>
        <CoverImage src={Cover} alt="cover" />
      </CoverContainer>
      <FormContainer>
        <HeaderContainer>
          <Title>{t('auth.signup')}</Title>
          <Subtitle>{t('auth.baseline')}</Subtitle>
        </HeaderContainer>
        <FormSection>
          <OAuthLogin />
          <Separator />
          <SignupForm />
        </FormSection>
      </FormContainer>
    </PageContainer>
  );
}

export default SignUp;
