import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // ✅ Décommentez et spécifiez le chemin vers votre fichier de configuration
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // ✅ Ajoutez les mappages de modules pour les alias
  moduleNameMapper: {
    // Gestion des alias de chemin
    '^@/(.*)$': '<rootDir>/src/$1',
    // Gestion des imports de fichiers statiques (si nécessaire)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // ✅ Ajoutez des transformations pour les fichiers spéciaux
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // ✅ Ignorez certains répertoires
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // ✅ Assurez-vous que l'environnement DOM est correctement configuré
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
