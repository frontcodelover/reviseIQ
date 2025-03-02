import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import React from 'react';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'fr',
  // Autres hooks utilisés
  usePathname: () => '/',
  Link: ({ children }: { children: React.ReactNode }) => {children},
}));

// Mock des variables d'environnement pour Supabase
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'fake-key';

// Mock du localStorage pour les tests
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true
});

// Mock de fetch si nécessaire
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200
  } as Response)
);