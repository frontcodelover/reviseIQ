"use server";

import { appContainer } from "@/infrastructure/config/AppContainer";

export const generateFlashcardAction = async (topic:string, number:number , savedLanguage:string, level:string) => {
  try {
    return await appContainer.getFlashcardService().generateFlashcards(topic, number, savedLanguage, level);
    
  } catch (error) {
    console.error("Erreur lors de la génération des flashcards", error);
  }
}