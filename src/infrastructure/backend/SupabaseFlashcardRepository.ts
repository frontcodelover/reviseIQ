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

  async generateFlashcards(topic: string, number: number, lang: string): Promise<Flashcard[]> {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error('Clé API Mistral non définie');
    }

    const client = new Mistral({ apiKey });
    const prompt = `Génère un maximum de ${number} flashcards pour apprendre ${topic} dans la langue ${lang}. Donne l'ensemble de toutes les flashcard un objet JSON brut sous cette forme UNIQUEMENT : '
		{
		"Question" : "...",
		 "Réponse" : "...",
		 "Mauvaise réponse 1" : "...",
		 "Mauvaise réponse 2" : "...",
		 "Mauvaise réponse 3" : "..."
		},'`;

    let flashcards: Flashcard[] = [];
    try {
      console.log('Envoi de la requête à Mistral');

      const result = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }],
      });

      if (!result?.choices?.[0]?.message?.content) {
        throw new Error('Format de réponse invalide');
      }
      const content = result.choices[0].message.content as string;
      flashcards = this.parseFlashcards(content);

      console.log('Flashcards générées:', flashcards);
      return flashcards;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw error;
    }
  }

  private parseFlashcards(content: string): Flashcard[] {
    try {
      // Nettoyer le markdown et le format JSON
      const cleanContent = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      // Ajouter les crochets pour créer un tableau valide si nécessaire
      const jsonContent = cleanContent.startsWith('[') ? cleanContent : `[${cleanContent}]`;

      // Supprimer la virgule finale si elle existe avant le crochet final
      const validJsonContent = jsonContent.replace(/,(\s*})*\s*\]$/, '$1]');

      // Parser le JSON
      const parsedContent = JSON.parse(validJsonContent);

      // Vérifier si c'est un tableau
      if (!Array.isArray(parsedContent)) {
        console.error('Format JSON invalide: attendu un tableau');
        return [];
      }

      return parsedContent.map((card) => ({
        question: card.Question,
        answer: card.Réponse || card.Answer,
        wrongAnswers: [
          card['Mauvaise réponse 1'] || card['Wrong answer 1'],
          card['Mauvaise réponse 2'] || card['Wrong answer 2'],
          card['Mauvaise réponse 3'] || card['Wrong answer 3'],
        ],
      }));
    } catch (error) {
      console.error('Erreur parsing JSON:', error, '\nContenu:', content);
      return [];
    }
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
