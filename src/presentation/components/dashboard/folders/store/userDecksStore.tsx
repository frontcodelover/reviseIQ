import { create } from 'zustand';

interface UserDeckState {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export const useUserDeckStore = create<UserDeckState>((set) => ({
  isOpen: true,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
