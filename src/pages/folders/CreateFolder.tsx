import CreateDeckForm from '@/components/createDeckForm';
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
