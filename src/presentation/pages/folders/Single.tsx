import SingleFolder from '@/presentation/components/dashboard/folders/SingleFolder';
import { useLoaderData } from 'react-router-dom';

interface Params {
  id: string;
}

export async function folderLoader({ params }: { params: Params }) {
  const { id } = params;
  return { id };
}

export default function SinglePageFolder() {
  // Récupération des données fournies par le loader
  const { id } = useLoaderData();
  return <SingleFolder id={id} />;
}
