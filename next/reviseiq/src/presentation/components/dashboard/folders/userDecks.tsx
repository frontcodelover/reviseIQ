'use client';
import { EmptyFolderState } from '@/presentation/components/dashboard/folders/EmptyFolderState';
import { NewFolderBtn } from '@/presentation/components/dashboard/folders/NewFolderBtn';
import { ThemaGroup } from '@/presentation/components/dashboard/folders/ThemaGroup';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { useFolders } from '@/presentation/hooks/useFolders';

export function UserDecks() {
  const { groupedDecks, loading, fetchUserDecks, hasDecks } = useFolders();

  if (loading) {
    return <Spinner className='mt-8' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='mb-4 flex justify-end gap-4'>
        {/* Assurez-vous que le type correspond exactement */}
        <NewFolderBtn onFolderCreated={fetchUserDecks} />
      </div>

      {hasDecks ? Object.entries(groupedDecks).map(([thema, decksInThema]) => <ThemaGroup key={thema} thema={thema} decks={decksInThema} onDeckDeleted={fetchUserDecks} />) : <EmptyFolderState />}
    </div>
  );
}

export default UserDecks;
