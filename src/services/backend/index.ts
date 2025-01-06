import { SupabaseBackend } from './supabase';

export interface Deck {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  color: string;
}

export interface Backend {
  getPublicDecks(): Promise<Deck[]>;
  getUserDecks(): Promise<Deck[]>;
  createDeck(deckData: Partial<Deck>): Promise<void>;
}

let backend: Backend = new SupabaseBackend();

export const setBackend = (newBackend: Backend) => {
  backend = newBackend;
};

export const getBackend = (): Backend => backend;
