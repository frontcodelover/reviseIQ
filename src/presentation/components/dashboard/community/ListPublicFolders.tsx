import { appContainer } from '@/infrastructure/config/AppContainer';
import { formatDate } from '@/lib/FormatDate';
import {
  type Folder,
  FolderSchema,
} from '@/presentation/components/dashboard/community/Folder.schema';
import { FoldersFilters } from '@/presentation/components/dashboard/community/FoldersFilters';
import { Pagination } from '@/presentation/components/dashboard/shared/Pagination';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

// Assurez-vous d'avoir installé date-fns

import { ThemaLabelKeys } from '../folders/form/themaLabel';
import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';

export function ListPublicFolders() {
  const { page, setPage, limit, setLimit, searchQuery, sortField, sortOrder } =
    useListPublicFoldersStore();
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchFolders = useCallback(async () => {
    const result = await appContainer.getFolderService().getPublicFolders(0, 999);

    const foldersWithDetails = await Promise.all(
      result.data.map(async (folder): Promise<Folder> => {
        const flashcards = await appContainer.getFlashcardService().getFlashcardsList(folder.id!);
        const profile = folder.user_id
          ? await appContainer.getUserService().getUserProfile(folder.user_id)
          : null;

        // Ne pas modifier la date, simplement l'utiliser telle quelle
        const folderData = {
          ...folder,
          id: folder.id || '',
          flashcardsCount: flashcards.length,
          author: profile ? { firstname: profile.firstname ?? '' } : null,
          description: folder.description ?? null,
          thema: folder.thema ?? null,
          user_id: folder.user_id || '',
          lang: folder.lang || 'fr',
          // S'assurer que created_at est une chaîne non-vide
          created_at: folder.created_at || new Date().toISOString(),
        };

        // Validation avec gestion d'erreur
        const result = FolderSchema.safeParse(folderData);
        if (!result.success) {
          console.error('Folder validation error:', result.error);
          return {
            ...folderData,
            created_at: new Date().toISOString(),
          } as Folder;
        }

        return result.data;
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

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

  const displayData = useMemo(() => processData(), [processData]);

  useEffect(() => {
    if (scrollContainerRef.current && displayData) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [displayData]);

  // Fonction utilitaire pour les étiquettes de thèmes
  const getThemaLabel = useCallback(
    (thema: string | null): string => {
      if (!thema) return t('dashboard.folder.thema.other');

      const themaLabel = ThemaLabelKeys.find((label) => label.key === thema.toUpperCase());

      return themaLabel ? t(themaLabel.i18nKey) : t('dashboard.folder.thema.other');
    },
    [t]
  );

  // Fonction de tri en-tête
  const onSort = useCallback(
    (field) => {
      const { setSortField, setSortOrder } = useListPublicFoldersStore.getState();
      if (field === sortField) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortOrder('asc');
      }
    },
    [sortField, sortOrder]
  );

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
    <div className="mt-6 space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
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

      <div className="rounded-md border">
        <div
          ref={scrollContainerRef}
          className="overflow-auto"
          style={{
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'thin',
          }}
        >
          {/* Conteneur avec largeur minimale garantie */}
          <div className="min-w-[100%] max-w-[87vw] md:w-full">
            <div className="relative w-full">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    {/* En-têtes de colonnes */}
                    <th
                      onClick={() => onSort('name')}
                      className="h-12 cursor-pointer px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      <div className="flex items-center gap-1">
                        {t('dashboard.communityTable.name')}
                        {sortField === 'name' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      onClick={() => onSort('thema')}
                      className="h-12 cursor-pointer px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      <div className="flex items-center gap-1">
                        {t('dashboard.communityTable.thema')}
                        {sortField === 'thema' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="h-12 w-[10%] px-4 text-left align-middle font-medium text-muted-foreground">
                      {t('dashboard.communityTable.creator')}
                    </th>
                    <th className="h-12 w-[5%] px-4 text-right align-middle font-medium text-muted-foreground">
                      {t('dashboard.communityTable.flashcards')}
                    </th>
                    <th className="h-12 w-[10%] px-4 text-left align-middle font-medium text-muted-foreground">
                      {t('dashboard.communityTable.lang')}
                    </th>
                    <th
                      onClick={() => onSort('created_at')}
                      className="h-12 cursor-pointer px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      <div className="flex items-center gap-1">
                        {t('dashboard.communityTable.created')}
                        {sortField === 'created_at' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {displayData.data.map((folder) => (
                    <tr key={folder.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="max-w-xs truncate p-4 align-middle font-medium">
                        <Link to={`/dashboard/folders/${folder.id}`} className="hover:underline">
                          {folder.name}
                        </Link>
                      </td>
                      <td className="p-4 align-middle">{getThemaLabel(folder.thema)}</td>
                      <td className="p-4 align-middle">{folder.author?.firstname}</td>
                      <td className="p-4 text-right align-middle">{folder.flashcardsCount}</td>
                      <td className="p-4 align-middle">
                        <div className="mx-auto h-5 w-5">{folder.lang}</div>
                      </td>
                      <td className="p-4 align-middle">{formatDate(folder.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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

export default ListPublicFolders;
