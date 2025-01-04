// Définition de l'interface du backend
export interface Backend {
  getPublicDecks(): Promise<any[]>; // Pas de changement ici
  getUserDecks(): Promise<any[]>; // Supprimer le paramètre userId
  createDeck(deckData: any): Promise<void>; // Pas de changement ici
}

// Backend concret pour Supabase
import { SupabaseBackend } from './supabase';

let backend: Backend = new SupabaseBackend();

// Permet de changer facilement de backend si besoin
export const setBackend = (newBackend: Backend) => {
  backend = newBackend;
};

export const getBackend = () => backend;
