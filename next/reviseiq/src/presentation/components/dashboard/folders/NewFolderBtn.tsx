'use client';

import { Button } from '@/presentation/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export interface NewFolderBtnProps {
  onFolderCreated: () => Promise<void>;
}

export function NewFolderBtn({ onFolderCreated }: NewFolderBtnProps) {
  const t = useTranslations();
  const router = useRouter();

  const handleClick = async () => {
    router.push('/dashboard/folders/new');
    await onFolderCreated();
  };

  return (
    <Button onClick={handleClick} variant='default' className='flex items-center gap-2 transition-colors hover:bg-primary/90'>
      <Plus className='h-4 w-4' />
      {t('dashboard.folder.createfolder')}
    </Button>
  );
}
