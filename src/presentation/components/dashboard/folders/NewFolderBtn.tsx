import { Button } from '@/presentation/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function NewFolderBtn() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/folders/new');
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      className="flex items-center gap-2 transition-colors hover:bg-primary/90"
    >
      <Plus className="h-4 w-4" />
      {t('dashboard.folder.createfolder')}
    </Button>
  );
}
