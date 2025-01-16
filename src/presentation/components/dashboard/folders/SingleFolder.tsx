import { useState, useEffect } from 'react';

import { SupabaseFolderRepository } from '@/infrasctructure/backend/SupabaseFolderRespository';
import { GetFolderById } from '@/application/useCases/GetFolderById.usecase';

import { SupabaseLogRepository } from '@/infrasctructure/backend/SupabaseLogRepository';
import { LogActionUseCase } from '@/application/useCases/LogAction.usecase';

import GetFlashcards from '@/presentation/components/dashboard/flashcards/getFlashcards';
import { useAuth } from '@/presentation/context/AuthContext';

const folderRepository = new SupabaseFolderRepository();
const logRepository = new SupabaseLogRepository();
const getFolderById = new GetFolderById(folderRepository);
const logAction = new LogActionUseCase(logRepository);

function SingleFolder({ id }: { id: string | undefined }) {
  const [folder, setFolder] = useState<Deck>();
  const { user } = useAuth();
  const user_id = user ? user.id : null;

  useEffect(() => {
    if (!id || !user_id) {
      console.error('ID or User ID is missing');
      return;
    }

    const fetchFolder = async () => {
      try {
        await Promise.all([
          logAction.execute(user_id, 'folder_viewed'),
          getFolderById.execute(id).then((data) => {
            setFolder(data);
          }),
        ]);
      } catch (error) {
        console.error('Erreur lors de la récupération du dossier :', error);
      }
    };

    fetchFolder();
  }, [id, user_id]);

  return (
    <div className="flex flex-col">
      {folder && (
        <div className="flex flex-col gap-2">
          <div className="w-fit rounded-md text-sm">
            <span className="text-gray-800">Thématique : {folder.thema}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{folder.name}</h2>
            <p className="text-lg text-gray-800">{folder.description}</p>
          </div>
        </div>
      )}

      <div className="flex h-full flex-col py-4">
        <GetFlashcards />
      </div>
    </div>
  );
}

export default SingleFolder;
