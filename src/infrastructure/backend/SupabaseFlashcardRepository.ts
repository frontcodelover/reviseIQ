import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { Mistral } from '@mistralai/mistralai';
import { Flashcard } from '@/domain/entities/Flashcard';
import { FlashcardRepository } from '@/domain/repositories/FlashcardRepository';
import { Quiz } from '@/domain/entities/Quiz';

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

  async generateFlashcards(topic: string, number: number): Promise<Flashcard[]> {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('Clé API Mistral non définie');
    }

    const client = new Mistral({ apiKey });
    const prompt = `Génère un maximum de ${number} flashcards pour apprendre ${topic}. Donne chaque flashcard sous le format 'Question : ... Réponse : ... Mauvaise réponse 1 : ... Mauvaise réponse 2 : ... Mauvaise réponse 3 : ...'`;

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

    // Nettoyage du texte
    const cleanedRaw = raw.replace(/\*\*/g, '').trim();
    const flashcards: Flashcard[] = [];

    // Séparation par numéro de flashcard
    const cardBlocks = cleanedRaw.split(/\d+\.\s+/).filter((block) => block.trim());

    for (const block of cardBlocks) {
      const lines = block
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const question = lines
        .find((line) => line.startsWith('Question'))
        ?.replace(/Question\s*:\s*/i, '')
        .trim();
      const answer = lines
        .find((line) => line.startsWith('Réponse'))
        ?.replace(/Réponse\s*:\s*/i, '')
        .trim();
      const wrongAnswers = lines
        .filter((line) => line.match(/Mauvaise réponse \d+\s*:/i))
        .map((line) => line.replace(/Mauvaise réponse \d+\s*:\s*/i, '').trim());

      if (question && answer && wrongAnswers.length > 0) {
        flashcards.push({
          id: Date.now() + flashcards.length,
          question,
          answer,
          wrongAnswers,
        });
      }
    }

    console.log('Flashcards créées:', flashcards);
    return flashcards;
  }

  async storeQuiz(deckId: string, flashcards: Flashcard[]): Promise<void> {
    const quiz = flashcards.map((card) => ({
      question: card.question,
      correctAnswer: card.answer,
      wrongAnswers: card.wrongAnswers,
    }));

    try {
      const { error } = await supabase.from('quizzes').insert([{ deck_id: deckId, quiz }]);
      if (error) {
        console.error('Error storing quiz:', error);
        throw error;
      }

      console.log('Quiz stored successfully');
    } catch (error) {
      console.error('Error in storeQuiz:', error);
      throw error;
    }
  }

  async getQuizByDeckId(deckId: string): Promise<Quiz | null> {
    try {
      const { data, error } = await supabase.from('quizzes').select('*').eq('deck_id', deckId);

      if (error) {
        console.error('Erreur lors de la récupération du quiz:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return null;
      }

      // Prendre le dernier quiz créé
      const latestQuiz = data[data.length - 1];

      return {
        id: latestQuiz.id,
        deck_id: latestQuiz.deck_id,
        questions: latestQuiz.quiz.map(
          (q: { question: string; correctAnswer: string; wrongAnswers: string[] }) => ({
            question: q.question,
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
          })
        ),
      };
    } catch (error) {
      console.error('Erreur dans getQuizByDeckId:', error);
      throw error;
    }
  }
}
