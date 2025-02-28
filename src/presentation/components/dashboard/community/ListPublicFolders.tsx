import { appContainer } from '@/infrastructure/config/AppContainer';
import {
  type Folder,
  FolderSchema,
} from '@/presentation/components/dashboard/community/Folder.schema';
import { FoldersDataTable } from '@/presentation/components/dashboard/community/FoldersDataTable';
import { Pagination } from '@/presentation/components/dashboard/shared/Pagination';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';

export default function ListPublicFolders() {
  const { page, setPage, limit, setLimit } = useListPublicFoldersStore();
  const { t } = useTranslation();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['folders', page, limit], async () => {
    const result = await appContainer
      .getFolderService()
      .getPublicFolders(page * limit, (page + 1) * limit - 1);

    // Transformer et valider les données
    const foldersWithDetails = await Promise.all(
      result.data.map(async (folder): Promise<Folder> => {
        const flashcards = await appContainer.getFlashcardService().getFlashcardsList(folder.id!);
        const profile = folder.user_id
          ? await appContainer.getUserService().getUserProfile(folder.user_id)
          : null;

        const folderData = {
          ...folder,
          id: folder.id || '',
          flashcardsCount: flashcards.length,
          author: profile ? { firstname: profile.firstname ?? '' } : null,
          description: folder.description ?? null,
          thema: folder.thema ?? null,
          user_id: folder.user_id || '',
          lang: folder.lang || 'fr',
          created_at: folder.created_at || new Date().toISOString(),
        };

        // Validation avec Zod
        const validated = FolderSchema.parse(folderData);
        return validated;
      })
    );

    return {
      ...result,
      data: foldersWithDetails,
    };
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner className="h-8 w-8 text-black dark:text-white" />
      </div>
    );
  }

  if (error) {
    return <div className="rounded-md bg-red-50 p-4 text-red-500">{(error as Error).message}</div>;
  }

  if (!response?.data) {
    return <div className="p-4 text-gray-500">Aucun dossier public trouvé</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-right font-medium">
        {response.count} {t('dashboard.communityTable.publicFolers')}
      </div>

      <FoldersDataTable folders={response.data} />

      <Pagination
        page={page}
        limit={limit}
        total={response.count}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(0);
        }}
      />
    </div>
  );
}
