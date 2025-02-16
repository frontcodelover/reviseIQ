import { create } from 'zustand';

interface GetAllPublicFolderState {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const useGetAllPublicFolderStore = create<GetAllPublicFolderState>((set) => ({
  page: 0,
  setPage: (page) => set({ page }),
  limit: 19,
  setLimit: (limit) => set({ limit }),
}));
