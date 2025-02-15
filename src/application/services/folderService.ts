import { appContainer } from '@/infrastructure/config/AppContainer';

const fetchFolderName = async (id: string): Promise<string> => {
  try {
    const folder: { name: string } = await appContainer.getFolderService().getFolderById(id);
    return folder.name;
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du dossier :', error);
    return id;
  }
};

export { fetchFolderName };
