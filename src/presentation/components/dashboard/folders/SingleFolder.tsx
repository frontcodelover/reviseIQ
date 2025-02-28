import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { GetFlashcards } from '@/presentation/components/dashboard/flashcards/display/GetAllFlashcards';
import { Alert, AlertDescription } from '@/presentation/components/ui/alert';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useAuth } from '@/presentation/context/AuthContext';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

interface SingleFolderProps {
  id: string | undefined;
}

export function SingleFolder({ id }: SingleFolderProps) {
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const user_id = user?.id ?? null;

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
      const isOwner = await appContainer.getFolderService().isOwner(id!, user_id);
      setIsOwner(isOwner);
      if (!isOwner) {
        return console.error("Vous n'êtes pas le propriétaire de ce dossier");
      }
    };
    checkOwnerShip();
  }, [folder, id, user_id]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="mx-auto h-8 w-[250px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-2 flex w-full flex-col space-y-6">
      {folder && <h2 className="text-center text-2xl font-medium">{folder.name}</h2>}
      <GetFlashcards isOwner={isOwner} />
    </div>
  );
}
