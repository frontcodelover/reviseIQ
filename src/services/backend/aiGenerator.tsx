import axios from 'axios';


export async function generateFlashcards(topic: string): Promise<Flashcard[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  const prompt = `Génère un maximum de 20 flashcards pour apprendre ${topic}. Donne chaque flashcard sous le format 'Question : ... Réponse : ...'.`; // Limite explicite à 20 flashcards

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1000, // Limite le contenu généré
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const text = response.data.choices[0].text;
    return parseFlashcards(text);
  } catch (error) {
    console.error('Erreur lors de la génération des flashcards :', error);
    throw new Error('Impossible de générer les flashcards');
  }
}

function parseFlashcards(raw: string): Flashcard[] {
  const flashcards: Flashcard[] = [];
  const lines = raw.split('\n').filter((line) => line.trim() !== '');
  let question = '';
  let answer = '';

  for (const line of lines) {
    if (line.startsWith('Question :')) {
      question = line.replace('Question :', '').trim();
    } else if (line.startsWith('Réponse :')) {
      answer = line.replace('Réponse :', '').trim();
      flashcards.push({ id: Date.now() + flashcards.length, question, answer });
      if (flashcards.length >= 20) break; // Limite à 20 flashcards
    }
  }

  return flashcards;
}