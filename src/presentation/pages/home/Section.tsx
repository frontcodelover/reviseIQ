import React from 'react';
import styled from 'styled-components';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import HeadingTwo from '@/presentation/components/ui/text/heading/HeadingTwo';
import Text from '@/presentation/components/ui/text/Text';
import { Wand, User } from 'lucide-react';

function Section() {
  return (
    <ContainerSection>
      {/* Section d'introduction */}
      <SectionOne>
        <HeadingPretty $size="xxxlarge" $weight="semibold" $color="black">
          Apprenez plus vite, retenez plus longtemps.
        </HeadingPretty>
        <BalanceText $color="secondary" $size="large">
          Rejoignez des milliers d’apprenants et boostez vos connaissances avec des flashcards
          interactives créées par la communauté. 🚀
        </BalanceText>
      </SectionOne>

      {/* Section des bénéfices */}
      <SectionTwo>
        <SubSection>
          <Wand size="40" />
          <HeadingPrettyTwo $size="medium" $weight="semibold" $color="black">
            Créez des flashcards en un clic avec l’IA
          </HeadingPrettyTwo>
          <BalanceText $color="secondary" $size="regular">
            Générez instantanément des flashcards à partir de textes ou d’articles et
            concentrez-vous sur l’apprentissage, pas sur la création.
          </BalanceText>
        </SubSection>

        <SubSection>
          <User size="40" />
          <HeadingPrettyTwo $size="medium" $weight="semibold" $color="black">
            Apprenez seul ou avec la communauté
          </HeadingPrettyTwo>
          <BalanceText $color="secondary" $size="regular">
            Explorez des milliers de flashcards partagées par d’autres apprenants et échangez des
            connaissances avec la communauté.
          </BalanceText>
        </SubSection>

        {/* <SubSection>
          <Trophy size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Restez motivé avec des récompenses
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            Gagnez des badges et relevez des défis pour garder votre motivation intacte et suivre
            vos progrès d’apprentissage.
          </BalanceText>
        </SubSection> */}

        {/* <SubSection>
          <FileQuestion size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Testez vos connaissances avec des quiz
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            Passez en mode quiz pour valider votre apprentissage et repérer les notions à
            approfondir.
          </BalanceText>
        </SubSection>

        <SubSection>
          <WalletCards size="40" />
          <HeadingPrettyTwo size="medium" weight="semibold" color="black">
            Un mode flashcards simple et efficace
          </HeadingPrettyTwo>
          <BalanceText color="secondary" size="regular">
            Révisez facilement avec un mode flashcards optimisé pour une rétention rapide et
            efficace.
          </BalanceText>
        </SubSection> */}
      </SectionTwo>
    </ContainerSection>
  );
}

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
  /* margin-top: 3rem; */
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

export default Section;
