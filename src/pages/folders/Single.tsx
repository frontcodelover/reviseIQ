import SingleFolder from '@/components/dashboard/folders/singleFolder';
import { useParams } from 'react-router-dom';

function SinglePageFolder() {
  const { id } = useParams();

  return (
    <>
      <div>Single</div>
      <SingleFolder id={id} />
    </>
  );
}

export default SinglePageFolder;
