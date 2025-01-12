import CreateDeckForm from '@/components/dashboard/folders/createFolderForm';
import { useUserDecksCount } from '@/hooks/useUserDecksCount';

function CreateFolder() {
  const { refresh } = useUserDecksCount();

  return (
    <>
      <CreateDeckForm onRefresh={refresh} />
    </>
  );
}

export default CreateFolder;
