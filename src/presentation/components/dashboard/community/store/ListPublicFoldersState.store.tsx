import { create } from 'zustand';

interface ListPublicFoldersState {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const useListPublicFoldersStore = create<ListPublicFoldersState>((set) => ({
  page: 0,
  setPage: (page) => set({ page }),
  limit: 19,
  setLimit: (limit) => set({ limit }),
}));
