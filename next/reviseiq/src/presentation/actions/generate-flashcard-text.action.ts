'use server';

import { appContainer } from '@/infrastructure/config/AppContainer';

export const generateFlashcardTextAction = async (pdfText: string, numCards: number, lang: string) => {
  try {
    return await appContainer.getFlashcardService().generateWithText(pdfText, numCards, lang);
  } catch (error) {
    console.error('Erreur lors de la génération des flashcards', error);
  }
};
