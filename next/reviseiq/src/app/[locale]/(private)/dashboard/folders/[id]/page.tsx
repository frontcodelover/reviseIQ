import { SingleFolder } from '@/presentation/components/dashboard/folders/SingleFolder';
import React from 'react';

export default async function SingleFolderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SingleFolder id={id} />;
}
