import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GetAllPublicFolders } from '@/presentation/components/dashboard/community/GetAllPublicFolder';
import { Typography } from '@mui/joy';
function Community() {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography level="h1" noWrap fontWeight={600}>
        {t('dashboard.community')}
      </Typography>
      <GetAllPublicFolders />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  margin: 1rem 0;
`;

export default Community;
