import { SupabaseBackend } from './supabase';

export interface Deck {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  color: string;
}

export interface User {
  user_id: string;
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
}

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
