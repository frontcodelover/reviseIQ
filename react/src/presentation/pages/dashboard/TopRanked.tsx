import { ListMostLikedFolders } from '@/presentation/components/dashboard/rank/ListMostLikedFolders';
import { PageContainer } from '@/presentation/shared/PageContainer';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TopRanked() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-foreground">{t('dashboard.topTitle')}</h1>
      <div className="mt-6">
        <ListMostLikedFolders />
      </div>
    </PageContainer>
  );
}
