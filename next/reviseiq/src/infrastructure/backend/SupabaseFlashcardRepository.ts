import { Flashcard } from '@/domain/entities/Flashcard';
import { FlashcardUpdate } from '@/domain/entities/Flashcard';
import { Quiz } from '@/domain/entities/Quiz';
import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { Mistral } from '@mistralai/mistralai';

import { SupabaseFolderRepository } from './SupabaseFolderRespository';

export class SupabaseFlashCardRepository implements FlashcardRepository {
  // create flashcards table "flashcards" field id, deck_id, question, answer, created_at
  async createFlashcard(flashcardData: Flashcard): Promise<void> {
    try {
      const { error } = await supabase.from('flashcards').insert([flashcardData]);

      if (error) {
        console.error('Error creating flashcard:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in createFlashcard:', error);
      throw error;
    }
  }

  // Fetch flashcards by deck ID
  async getFlashcards(deckId: string): Promise<Flashcard[]> {
    try {
      const { data, error } = await supabase.from('flashcards').select('*').eq('deck_id', deckId);

      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error in getFlashcards:', error);
      throw error;
    }
  }

  async generateFlashcards(topic: string, number: number, lang: string, level: string): Promise<Flashcard[]> {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('Clé API Mistral non définie');
    }

    const client = new Mistral({ apiKey });
    const prompt = `Génère un maximum de ${number} questions/reponses pour apprendre ${topic} dans la langue ${lang} avec un niveau de difficulté : ${level}. Les fausses réponses devront faire la meme taille que la vraie réponse. Donne l'ensemble de toutes les flashcard sous ce format : '
		[{
		"question" : "...",
		 "answer" : "...",
		 "wrong_one" : "...",
		 "wrong_two" : "...",
		 "wrong_three" : "..."
	}]'
		Tu feras ça pour le nombre de flashcards demandé. Pour chaque flashcard tu devras générer 3 fausses réponses impérativement.
		`;

    try {
      const result = await client.chat.complete({
        model: 'mistral-large-latest',
        responseFormat: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });

      if (!result?.choices?.[0]?.message?.content) {
        throw new Error('Format de réponse invalide');
      }
      const content = result.choices[0].message.content as string;

      console.warn('Flashcards générées:', content);
      return JSON.parse(content);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw error;
    }
  }

  async generateWithText(text: string, number: number, lang: string): Promise<Flashcard[]> {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('Clé API Mistral non définie');
    }

    const client = new Mistral({ apiKey });
    const prompt = `Génère un maximum de ${number} dans la langue ${lang} questions/réponses à partir du texte suivant : ${text}. Donne l'ensemble de toutes les flashcard sous ce format : '
		[{
		"question" : "...",
		 "answer" : "...",
		 "wrong_one" : "...",
		 "wrong_two" : "...",
		 "wrong_three" : "..."
	}]'
		Tu feras ça pour le nombre de flashcards demandé. Pour chaque flashcard tu devras générer 3 fausses réponses qui auront impérativement le même nombre de caractères que la bonne réponse (marge de 5%).
		`;

    try {
      const result = await client.chat.complete({
        model: 'mistral-large-latest',
        responseFormat: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });

      if (!result?.choices?.[0]?.message?.content) {
        throw new Error('Format de réponse invalide');
      }
      const content = result.choices[0].message.content as string;

      console.warn('Flashcards générées:', content);
      return JSON.parse(content);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw error;
    }
  }

  async getQuizByFolderId(folderId: string): Promise<Quiz | null> {
    try {
      const { data, error } = await supabase.from('flashcards').select('id, deck_id, question, answer, wrong_one, wrong_two, wrong_three').eq('deck_id', folderId);

      if (error) {
        console.error('Erreur lors de la récupération du quiz:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return null;
      }

      // Transforme les données pour correspondre à la structure de Quiz
      const questions = data.map((item) => ({
        question: item.question,
        correctAnswer: item.answer,
        wrongAnswers: [item.wrong_one, item.wrong_two, item.wrong_three].filter((a) => a !== null && a !== undefined && a !== item.answer), // Filtre les réponses vides et la réponse correcte
      }));

      // Créer l'objet Quiz
      const quiz: Quiz = {
        id: folderId, // Utilise folderId comme ID du quiz, car il n'y a pas d'ID de quiz unique dans les données
        deck_id: folderId,
        questions: questions,
      };

      return quiz;
    } catch (error) {
      console.error('Erreur dans getQuizByDeckId:', error);
      throw error;
    }
  }

  async updateFlashcard(flashcardId: string, deckId: string, userId: string, updates: FlashcardUpdate): Promise<void> {
    try {
      // Validation des données
      if (!flashcardId || !deckId || !userId) {
        throw new Error('Paramètres requis manquants');
      }

      if (!updates.question && !updates.answer && !updates.wrongAnswers) {
        throw new Error('Aucune modification fournie');
      }

      // Vérification propriétaire
      const folderRepo = new SupabaseFolderRepository();
      const isOwner = await folderRepo.isFolderOwner(deckId, userId);

      if (!isOwner) {
        throw new Error("Vous n'êtes pas autorisé à modifier cette flashcard");
      }

      // Vérification existence flashcard
      const { data: existingFlashcard } = await supabase.from('flashcards').select('*').eq('id', flashcardId).eq('deck_id', deckId).single();

      if (!existingFlashcard) {
        throw new Error('Flashcard introuvable');
      }

      // Mise à jour
      const updateData: Partial<Flashcard> = {};
      if (updates.question) updateData.question = updates.question;
      if (updates.answer) updateData.answer = updates.answer;

      const { error } = await supabase.from('flashcards').update(updateData).eq('id', flashcardId).eq('deck_id', deckId);

      if (error) {
        console.error('Erreur lors de la mise à jour de la flashcard:', error);
        throw new Error('Échec de la mise à jour de la flashcard');
      }
    } catch (error) {
      console.error('Erreur dans updateFlashcard:', error);
      throw error;
    }
  }
}
