import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import HeadingOne from '@/presentation/components/ui/text/heading/HeadingOne';
import { Folders as Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function Folders() {
  const { t } = useTranslation();
  return (
    <Container>
      <HeadingOne $size="xlarge" $color="black" $weight="medium">
        <FlexContainer>
          {t('dashboard.folder.yourfolder')} <Folder />
        </FlexContainer>
      </HeadingOne>

      <UserDecks />
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

export default Folders;
