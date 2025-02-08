import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import styled from 'styled-components';

import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { GetFolderById } from '@/application/useCases/folder/GetFolderById.usecase';

import { SupabaseLogRepository } from '@/infrastructure/backend/SupabaseLogRepository';
import { LogActionUseCase } from '@/application/useCases/badge/LogAction.usecase';

import { GetFlashcards } from '@/presentation/components/dashboard/flashcards/GetAllFlashcards';
import { useAuth } from '@/presentation/context/AuthContext';

import { Folder } from '@/domain/entities/Folder';

import { Typography } from '@mui/joy';

const folderRepository = new SupabaseFolderRepository();
const logRepository = new SupabaseLogRepository();
const getFolderById = new GetFolderById(folderRepository);
const logAction = new LogActionUseCase(logRepository);

function SingleFolder({ id }: { id: string | undefined }) {
  const [isOwner, setIsOwner] = useState(false);
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
    const checkOwnerShip = async () => {
      if (!user_id) return;
      const isOwner = await folderRepository.isFolderOwner(id!, user_id!);
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
    <div className="flex flex-col">
      {folder && (
        <Container>
          <Typography level="h2" fontWeight={500} sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
            {folder.name}
          </Typography>
        </Container>
      )}

      <GetFlashcards isOwner={isOwner} />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  margin: 2rem 0;
`;

export default SingleFolder;
