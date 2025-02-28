import { appContainer } from '@/infrastructure/config/AppContainer';
import {
  type Folder,
  FolderSchema,
} from '@/presentation/components/dashboard/community/Folder.schema';
import { FoldersDataTable } from '@/presentation/components/dashboard/community/FoldersDataTable';
import { FoldersFilters } from '@/presentation/components/dashboard/community/FoldersFilters';
import { Pagination } from '@/presentation/components/dashboard/shared/Pagination';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';

export default function ListPublicFolders() {
  const { page, setPage, limit, setLimit, searchQuery, sortField, sortOrder } =
    useListPublicFoldersStore();
  const { t } = useTranslation();

  // Cette fonction ne change pas entre les rendus, ce qui limite les re-rendus
  const fetchFolders = useCallback(async () => {
    // Récupérer TOUS les dossiers depuis le service au lieu d'une page à la fois
    // Nous ferons la pagination côté client
    const result = await appContainer.getFolderService().getPublicFolders(0, 999);

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
        return FolderSchema.parse(folderData);
      })
    );

    return {
      ...result,
      allData: foldersWithDetails,
    };
  }, []);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['folders'], fetchFolders, {
    staleTime: 5 * 60 * 1000, // Conserve les données pendant 5 minutes
    cacheTime: 10 * 60 * 1000, // Garde en cache 10 minutes
  });

  // Séparation du traitement des données (filtrage, tri, pagination) de la requête
  const processData = useCallback(() => {
    if (!response?.allData) return { data: [], count: 0, filteredCount: 0 };

    // Filtrer par recherche
    let filteredData = response.allData;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter((folder) => folder.name.toLowerCase().includes(query));
    }

    // Trier les dossiers
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortField === 'thema') {
        if (!a.thema && !b.thema) return 0;
        if (!a.thema) return sortOrder === 'asc' ? -1 : 1;
        if (!b.thema) return sortOrder === 'asc' ? 1 : -1;
      }

      if (sortField === 'created_at') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

      const valueA = a[sortField]?.toString().toLowerCase() || '';
      const valueB = b[sortField]?.toString().toLowerCase() || '';

      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    // Appliquer la pagination
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      count: response.allData.length,
      filteredCount: filteredData.length,
    };
  }, [response, page, limit, searchQuery, sortField, sortOrder]);

  // Applique le traitement des données
  const displayData = processData();

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

  if (!displayData.data || displayData.data.length === 0) {
    return (
      <div className="space-y-4">
        <FoldersFilters />
        <div className="rounded-md border p-8 text-center text-gray-500">
          {searchQuery
            ? t('dashboard.communityTable.noFoldersFound')
            : t('dashboard.communityTable.noPublicFolders')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2">
        <div className="w-full">
          <FoldersFilters />
        </div>
        <div className="text-right font-medium">
          {searchQuery ? (
            <span>
              {displayData.filteredCount} {t('dashboard.communityTable.foundFolders')}
              <span className="text-gray-500">
                {' '}
                {t('dashboard.communityTable.outOf')} {displayData.count}
              </span>
            </span>
          ) : (
            <span>
              {displayData.count} {t('dashboard.communityTable.publicFolers')}
            </span>
          )}
        </div>
      </div>

      <FoldersDataTable
        folders={displayData.data}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(field) => {
          const { setSortField, setSortOrder } = useListPublicFoldersStore.getState();
          if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
            setSortField(field);
            setSortOrder('asc');
          }
        }}
      />

      <Pagination
        page={page}
        limit={limit}
        total={displayData.filteredCount}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(0);
        }}
      />
    </div>
  );
}
