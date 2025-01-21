import { useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetFolderById } from '@/application/useCases/GetFolderById.usecase';

import { SupabaseLogRepository } from '@/infrastructure/backend/SupabaseLogRepository';
import { LogActionUseCase } from '@/application/useCases/LogAction.usecase';

import { GetFlashcards } from '@/presentation/components/dashboard/flashcards/GetFlashcards';
import { useAuth } from '@/presentation/context/AuthContext';

import { Folder } from '@/domain/entities/Folder';

const folderRepository = new SupabaseFolderRepository();
const logRepository = new SupabaseLogRepository();
const getFolderById = new GetFolderById(folderRepository);
const logAction = new LogActionUseCase(logRepository);

function SingleFolder({ id }: { id: string | undefined }) {
  const { user } = useAuth();
  const user_id = user ? user.id : null;

  const {
    data: folder,
    isLoading,
    error,
  } = useQuery<Folder, Error>(['folder', id], () => getFolderById.execute(id!), {
    enabled: !!id && !!user_id,
  });

  const logMutation = useMutation(() => logAction.execute(user_id!, 'folder_viewed'));

  useEffect(() => {
    if (folder) {
      logMutation.mutate();
    }
  }, [folder]);

  if (isLoading) return <p>Chargement du dossier...</p>;
  if (error) return <p>Erreur lors de la récupération du dossier.</p>;

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
