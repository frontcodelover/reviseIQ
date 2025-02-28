import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Search, X } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';

export function FoldersFilters() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery, sortField, sortOrder, resetFilters } =
    useListPublicFoldersStore();

  // Mémorisez les fonctions de handler pour éviter des re-rendus inutiles
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const hasActiveFilters = searchQuery || sortField !== 'created_at' || sortOrder !== 'desc';

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="relative w-full md:w-2/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder={t('dashboard.communityTable.searchPlaceholder')}
          className="pl-8"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          {t('dashboard.communityTable.resetFilters')}
        </Button>
      )}
    </div>
  );
}
