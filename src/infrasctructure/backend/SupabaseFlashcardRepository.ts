import { supabase } from '@/infrasctructure/backend/SupabaseClient';
import { Mistral } from '@mistralai/mistralai';
import { Flashcard } from '@/domain/entities/Flashcard';
import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';

export class SupabaseFlashCardRepository implements FlashcardRepository {
  // create flashcards table "flashcards" field id, deck_id, question, answer, created_at
  async createFlashcard(flashcardData: Flashcard): Promise<void> {
    try {
      const { error } = await supabase.from('flashcards').insert([flashcardData]);

      if (error) {
        console.error('Error creating flashcard:', error);
        throw error;
      }

      console.log('Flashcard created successfully');
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

  async generateFlashcards(topic: string): Promise<Flashcard[]> {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('Clé API Mistral non définie');
    }

    const client = new Mistral({ apiKey });
    const prompt = `Génère un maximum de 10 flashcards pour apprendre ${topic}. Donne chaque flashcard sous le format 'Question : ... Réponse : ...'`;

    try {
      console.log('Envoi de la requête à Mistral');
      const result = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }],
      });
      console.log('Réponse de Mistral:', result);

      if (!result?.choices?.[0]?.message?.content) {
        throw new Error('Format de réponse invalide');
      }

      const content = result.choices[0].message.content as string;
      const flashcards = this.parseFlashcards(content);

      return flashcards;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw error;
    }
  }

  parseFlashcards(raw: string): Flashcard[] {
    console.log('Contenu brut à parser:', raw);

    const cleanedRaw = raw.replace(/\*\*/g, '');
    const flashcards: Flashcard[] = [];
    const lines = cleanedRaw.split('\n').filter((line) => line.trim() !== '');

    console.log('Lignes après split:', lines);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Recherche des motifs "Question :" et "Réponse :"
      const questionMatch = line.match(/Question\s*:\s*(.*)/i);
      //   const answerMatch = line.match(/Réponse\s*:\s*(.*)/i);

      if (questionMatch) {
        const question = questionMatch[1].trim();
        // Chercher la réponse dans la ligne suivante
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.includes('Réponse :')) {
          const answerMatch = nextLine.match(/Réponse\s*:\s*(.*)/i);
          if (answerMatch) {
            const answer = answerMatch[1].trim();
            flashcards.push({
              id: Date.now() + i,
              question,
              answer,
            });
            i++; // Sauter la ligne de réponse
          }
        }
      }
    }

    console.log('Flashcards créées:', flashcards);
    return flashcards;
  }
}
