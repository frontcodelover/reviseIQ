import { SupabaseBackend } from '@/services/backend/supabase';

let backend: BackendType = new SupabaseBackend();

export const setBackend = (newBackend: BackendType) => {
  backend = newBackend;
};

export const getBackend = (): BackendType => backend;
