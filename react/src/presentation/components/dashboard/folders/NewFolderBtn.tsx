import { Button } from '@/presentation/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Définition explicite du type de la prop
export interface NewFolderBtnProps {
  onFolderCreated: () => Promise<void>;
}

export function NewFolderBtn({ onFolderCreated }: NewFolderBtnProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate('/dashboard/folders/new');
    await onFolderCreated();
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
