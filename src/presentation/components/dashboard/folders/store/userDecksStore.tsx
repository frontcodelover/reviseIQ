import { create } from 'zustand';

interface UserDeckState {
  openThemas: Set<string>;
  toggleThema: (thema: string) => void;
  isThemaOpen: (thema: string) => boolean;
}

export const useUserDeckStore = create<UserDeckState>((set, get) => ({
  openThemas: new Set(['all']), // Par défaut tous les thèmes sont ouverts
  isThemaOpen: (thema: string) => get().openThemas.has(thema),
  toggleThema: (thema: string) =>
    set((state) => {
      const newOpenThemas = new Set(state.openThemas);
      if (newOpenThemas.has(thema)) {
        newOpenThemas.delete(thema);
      } else {
        newOpenThemas.add(thema);
      }
      return { openThemas: newOpenThemas };
    }),
}));
