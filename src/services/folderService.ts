import { getBackend } from '@/services/backend';

const fetchFolderName = async (id: string): Promise<string> => {
  try {
    const backend = getBackend();
    const folder: { name: string } = await backend.getFolderById(id);
    return folder.name;
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du dossier :', error);
    return id; // Retourne l'ID si une erreur se produit
  }
};

export { fetchFolderName };