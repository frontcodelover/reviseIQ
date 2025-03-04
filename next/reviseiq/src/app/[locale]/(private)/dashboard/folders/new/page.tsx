'use client';
import CreateFolderForm from '@/presentation/components/dashboard/folders/form/CreateFolderForm';
import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';

import React from 'react';

export default function pageCreateFolder() {
  const { refresh } = useUserDecksCount();
  return <CreateFolderForm onRefresh={refresh} />;
}
