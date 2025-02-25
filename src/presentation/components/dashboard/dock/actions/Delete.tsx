import { appContainer } from '@/infrastructure/config/AppContainer';
import { IconButton } from '@/presentation/components/dashboard/dock/ui/IconButton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/presentation/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Delete({
  deckId,
  isOwner,
}: {
  deckId: string | undefined;
  isOwner: boolean;
}) {
  const navigate = useNavigate();

  const deleteFolder = async () => {
    if (isOwner && deckId) {
      try {
        await appContainer.getFolderService().deleteFolder(deckId);
        navigate('/dashboard/folders');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <IconButton tooltipText="Supprimer le dossier" className="hover:text-red-500">
          <Trash2 className="h-5 w-5" />
        </IconButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement votre dossier et toutes
            les flashcards associées.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteFolder}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
