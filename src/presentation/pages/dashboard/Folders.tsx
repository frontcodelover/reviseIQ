import UserDecks from '@/presentation/components/dashboard/folders/userDecks';
import { Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function Folders() {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography level="h1" noWrap fontWeight={600}>
        {t('dashboard.folder.yourfolder')}
      </Typography>

      <UserDecks />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 1rem 0;
`;

export default Folders;
