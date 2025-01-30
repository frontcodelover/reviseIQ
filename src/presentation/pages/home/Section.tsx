import React from 'react';
import styled from 'styled-components';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import HeadingTwo from '@/presentation/components/ui/text/heading/HeadingTwo';
import Text from '@/presentation/components/ui/text/Text';
import { Pen } from 'lucide-react';

const ContainerSection = styled.section`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 2rem;
  width: 1080px;
`;

const SectionOne = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTwo = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BalanceText = styled(Text)`
  text-wrap: pretty;
`;

const HeadingPretty = styled(HeadingOne)`
  text-wrap: pretty;
`;

const HeadingPrettyTwo = styled(HeadingTwo)`
  text-wrap: balance;
`;

function Section() {
  return (
    <ContainerSection>
      <SectionOne>
        <HeadingPretty size="xxxlarge" weight="semibold" color="black">
          Apprenez avec la communauté et restez motivé
        </HeadingPretty>
        <BalanceText color="secondary" size="large">
          ReviseIQ c’est une communauté qui partage des dossiers de flashcards pour apprendre de
          nouvelles compétences et rester motivé. Rejoignez-nous pour apprendre et partager vos
          connaissances avec d'autres passionnés.
        </BalanceText>
      </SectionOne>
      <SectionTwo>
        <SubSection>
          <Pen size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Plus qu'un outil de révision
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            ReviseIQ c’est une communauté qui partage des dossiers de flashcards pour apprendre de
            nouvelles compétences.
          </BalanceText>
        </SubSection>

        <SubSection>
          <Pen size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Pour les élèves et les étudiants
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            Si vous êtes un élève ou un étudiant, ReviseIQ est l'outil idéal pour vous aider à
            réviser et à mémoriser les informations importantes.
          </BalanceText>
        </SubSection>

        <SubSection>
          <Pen size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Pour les professionnelles
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            ReviseIQ c’est une communauté qui partage des dossiers de flashcards pour apprendre de
            nouvelles compétences.
          </BalanceText>
        </SubSection>
      </SectionTwo>
    </ContainerSection>
  );
}

export default Section;
