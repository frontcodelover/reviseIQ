import CreateDeckForm from '@/presentation/components/dashboard/folders/form/CreateFolderForm';
import { useUserDecksCount } from '@/presentation/hooks/useUserDecksCount';

function CreateFolder() {
  const { refresh } = useUserDecksCount();

  return <CreateDeckForm onRefresh={refresh} />;
}

export default CreateFolder;
