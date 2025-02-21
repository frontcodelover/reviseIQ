import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { GetFlashcards } from '@/presentation/components/dashboard/flashcards/display/GetAllFlashcards';
import { useAuth } from '@/presentation/context/AuthContext';
import { Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';

function SingleFolder({ id }: { id: string | undefined }) {
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const user_id = user ? user.id : null;

  const {
    data: folder,
    isLoading,
    error,
  } = useQuery<Folder, Error>(['folder', id], () =>
    appContainer.getFolderService().getFolderById(id!)
  );

  const logMutation = useMutation(() =>
    appContainer.getLogService().logAction(user_id!, 'folder_viewed')
  );

  useEffect(() => {
    if (folder) {
      logMutation.mutate();
    }
    const checkOwnerShip = async () => {
      if (!user_id) return;
      const isOwner = await appContainer.getFolderService().isOwner(id!, user_id!);
      setIsOwner(isOwner);
      if (!isOwner) {
        return console.error('You are not the owner of this folder');
      }
    };
    checkOwnerShip();
  }, [folder]);

  if (isLoading) return <p>Chargement du dossier...</p>;
  if (error) return <p>Erreur lors de la récupération du dossier.</p>;

  return (
    <div className="flex w-full flex-col">
      {folder && (
        <Typography level="h2" fontWeight={500} sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
          {folder.name}
        </Typography>
      )}

      <GetFlashcards isOwner={isOwner} />
    </div>
  );
}

export default SingleFolder;
