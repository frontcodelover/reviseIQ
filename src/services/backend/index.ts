import { SupabaseBackend } from './supabase';

export interface Backend {
  getPublicDecks(): Promise<Deck[]>;
  getUserDecks(): Promise<Deck[]>;
  createDeck(deckData: Partial<Deck>): Promise<void>;
  upsertUser(userData: Partial<User>): Promise<void>;
}

let backend: Backend = new SupabaseBackend();

export const setBackend = (newBackend: Backend) => {
  backend = newBackend;
};

export const getBackend = (): Backend => backend;
