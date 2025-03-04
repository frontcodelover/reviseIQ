
// import { Flashcard } from '@/domain/entities/Flashcard';
// import { Mistral } from '@mistralai/mistralai';

// export default async function generateFlashcards(topic: string, number: number, lang: string, level: string): Promise < Flashcard[] > {
// 	const apiKey = process.env.MISTRAL_API_KEY;
// 	if (!apiKey) {
// 		throw new Error('Clé API Mistral non définie');
// 	}

// 	const client = new Mistral({ apiKey });
// 	const prompt = `Génère un maximum de ${number} questions/reponses pour apprendre ${topic} dans la langue ${lang} avec un niveau de difficulté : ${level}. Les fausses réponses devront faire la meme taille que la vraie réponse. Donne l'ensemble de toutes les flashcard sous ce format : '
// 	[{
// 	"question" : "...",
// 	 "answer" : "...",
// 	 "wrong_one" : "...",
// 	 "wrong_two" : "...",
// 	 "wrong_three" : "..."
// }]'
// 	Tu feras ça pour le nombre de flashcards demandé. Pour chaque flashcard tu devras générer 3 fausses réponses impérativement.
// 	`;

// 	try {
// 		const result = await client.chat.complete({
// 			model: 'mistral-large-latest',
// 			responseFormat: { type: 'json_object' },
// 			messages: [{ role: 'user', content: prompt }],
// 		});

// 		if (!result?.choices?.[0]?.message?.content) {
// 			throw new Error('Format de réponse invalide');
// 		}
// 		const content = result.choices[0].message.content as string;

// 		console.warn('Flashcards générées:', content);
// 		return JSON.parse(content);
// 	} catch (error) {
// 		console.error('Erreur détaillée:', error);
// 		throw error;
// 	}
// }