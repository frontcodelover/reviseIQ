import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GetAllPublicFolders } from '@/presentation/components/dashboard/community/GetAllPublicFolder';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import { MessageCircleHeart } from 'lucide-react';
function Community() {
  const { t } = useTranslation();
  return (
    <Container>
      <HeadingOne $size="xlarge" $color="black" $weight="medium">
        <FlexContainer>
          {t('dashboard.community')}
          <MessageCircleHeart />
        </FlexContainer>
      </HeadingOne>

      <GetAllPublicFolders />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  margin: 2rem 0;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default Community;
