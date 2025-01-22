import SingleFolder from '@/presentation/components/dashboard/folders/SingleFolder';
import { useParams } from 'react-router-dom';

function SinglePageFolder() {
  const { id } = useParams();

  return <SingleFolder id={id} />;
}

export default SinglePageFolder;
