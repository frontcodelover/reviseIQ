import { GetFolderById } from '@/application/useCases/GetFolderById.usecase';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';

const folderRepository = new SupabaseFolderRepository();
const getFolderById = new GetFolderById(folderRepository);

const fetchFolderName = async (id: string): Promise<string> => {
  try {
    const folder: { name: string } = await getFolderById.execute(id);
    return folder.name;
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du dossier :', error);
    return id;
  }
};

export { fetchFolderName };
