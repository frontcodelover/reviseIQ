import { create } from 'zustand';

export type SortField = 'name' | 'created_at' | 'thema';
export type SortOrder = 'asc' | 'desc';

interface ListPublicFoldersState {
  page: number;
  limit: number;
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (query: string) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
}

export const useListPublicFoldersStore = create<ListPublicFoldersState>((set) => ({
  page: 0,
  limit: 20,
  searchQuery: '',
  sortField: 'created_at',
  sortOrder: 'desc',

  setPage: (page) => set(() => ({ page })),
  setLimit: (limit) => set(() => ({ limit })),
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery, page: 0 })),
  setSortField: (sortField) => set(() => ({ sortField })),
  setSortOrder: (sortOrder) => set(() => ({ sortOrder })),
  resetFilters: () =>
    set(() => ({
      searchQuery: '',
      sortField: 'created_at',
      sortOrder: 'desc',
      page: 0,
    })),
}));
