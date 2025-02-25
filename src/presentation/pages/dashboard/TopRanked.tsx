import { ListMostLikedFolders } from '@/presentation/components/dashboard/rank/ListMostLikedFolders';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TopRanked() {
  const { t } = useTranslation();
  return (
    <div className="flex w-auto flex-col space-y-6">
      <h1 className="truncate text-3xl font-semibold text-foreground">{t('dashboard.topTitle')}</h1>
      <ListMostLikedFolders />
    </div>
  );
}
