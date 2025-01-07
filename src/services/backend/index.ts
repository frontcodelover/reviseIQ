import { SupabaseBackend } from './supabase';

let backend: Backend = new SupabaseBackend();

export const setBackend = (newBackend: Backend) => {
  backend = newBackend;
};

export const getBackend = (): Backend => backend;
