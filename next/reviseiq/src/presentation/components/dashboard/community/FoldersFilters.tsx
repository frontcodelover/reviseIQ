import { Input } from '@/presentation/components/ui/input';
import { Search } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { useListPublicFoldersStore } from './store/ListPublicFoldersState.store';

export function FoldersFilters() {
  const t = useTranslations();
  const { searchQuery, setSearchQuery } = useListPublicFoldersStore();

  // Mémorisez les fonctions de handler pour éviter des re-rendus inutiles
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  return (
    <div className='relative'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
      <Input type='search' placeholder={t('dashboard.communityTable.searchPlaceholder')} className='pl-8' value={searchQuery} onChange={handleSearchChange} />
    </div>
  );
}
