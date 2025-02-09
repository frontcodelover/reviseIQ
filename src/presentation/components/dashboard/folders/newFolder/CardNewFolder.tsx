import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, styled } from '@mui/joy';

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  width: 'fit-content',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  color: 'white',
  backgroundColor: theme.palette.primary.solidActiveBg,
  '&:hover': {
    backgroundColor: theme.palette.primary.solidHoverBg,
  },
}));

const CardNewFolder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/folders/new');
  };

  return (
    <StyledButton onClick={handleClick} variant="plain" startDecorator={<Plus />}>
      {t('dashboard.folder.createfolder')}
    </StyledButton>
  );
};

export default CardNewFolder;
