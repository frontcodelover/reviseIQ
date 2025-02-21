import { appContainer } from '@/infrastructure/config/AppContainer';
import { useQuery } from 'react-query';
import { FolderSchema, type Folder } from './Folder.schema';
import { Pagination } from '../../ui/Pagination';
import { FoldersDataTable } from './FoldersDataTable';
import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';
import { Spinner } from '../shared/Spinner';
import { useTranslation } from 'react-i18next';

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
          lang: (folder.lang as 'fr' | 'en') || 'fr',
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
      <div className="flex justify-center items-center p-4">
				 <Spinner className="text-black dark:text-white h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {(error as Error).message}
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="p-4 text-gray-500">
        Aucun dossier public trouvé
      </div>
    );
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