// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Plus, Trash2 } from 'lucide-react';
// import { getBackend } from '@/services/backend';
// import { useParams } from 'react-router-dom';

// function CreateFlashcard({ onSuccess }: { onSuccess?: () => void }) {
//   const { id: deckId } = useParams<{ id: string }>();
//   const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
//   const [manualFlashcards, setManualFlashcards] = useState<Flashcard[]>([
//     { id: Date.now(), question: '', answer: '' },
//   ]);
//   const [topic, setTopic] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const generateFlashcards = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       console.log('Début de la génération');
//       const backend = getBackend();
//       const result = await backend.generateFlashcards(topic);
//       console.log('Résultat de la génération:', result);

//       if (result && result.length > 0) {
//         setFlashcards(result as Flashcard[]);
//       } else {
//         throw new Error('Aucune flashcard générée');
//       }
//     } catch (err) {
//       console.error('Erreur lors de la génération:', err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : 'Erreur lors de la génération des flashcards'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const backend = getBackend();
//       const allFlashcards = [...manualFlashcards, ...flashcards];
//       for (const card of allFlashcards) {
//         if (card.question.trim() && card.answer.trim()) {
//           await backend.createFlashcard({
//             deck_id: deckId,
//             question: card.question,
//             answer: card.answer,
//           });
//         }
//       }
//       onSuccess?.();
//     } catch (err) {
//       setError('Erreur lors de la création des flashcards');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addManualFlashcard = () => {
//     setManualFlashcards([
//       ...manualFlashcards,
//       { id: Date.now(), question: '', answer: '' },
//     ]);
//   };

//   const updateManualFlashcard = (
//     id: number,
//     field: keyof Flashcard,
//     value: string
//   ) => {
//     setManualFlashcards(
//       manualFlashcards.map((card) =>
//         card.id === id ? { ...card, [field]: value } : card
//       )
//     );
//   };

//   const removeManualFlashcard = (id: number) => {
//     setManualFlashcards(manualFlashcards.filter((card) => card.id !== id));
//   };

//   return (
//     <div className="space-y-4">
//       {error && <div className="mb-4 text-red-500">{error}</div>}

//       <Input
//         type="text"
//         placeholder="Entrez un sujet (e.g., Javascript)"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//       />

//       <Button
//         onClick={generateFlashcards}
//         disabled={!topic.trim() || loading}
//         className="w-full"
//       >
//         {loading ? 'Génération...' : 'Générer des flashcards'}
//       </Button>

//       <h2 className="text-lg font-bold">Flashcards générées</h2>
//       {flashcards.map((card) => (
//         <div key={card.id} className="flex items-center gap-2">
//           <Input
//             type="text"
//             placeholder="Question"
//             value={card.question}
//             readOnly
//           />
//           <Input
//             type="text"
//             placeholder="Réponse"
//             value={card.answer}
//             readOnly
//           />
//         </div>
//       ))}

//       <h2 className="text-lg font-bold">Flashcards manuelles</h2>
//       {manualFlashcards.map((card) => (
//         <div key={card.id} className="flex items-center gap-2">
//           <Input
//             type="text"
//             placeholder="Question"
//             value={card.question}
//             onChange={(e) =>
//               updateManualFlashcard(card.id, 'question', e.target.value)
//             }
//           />
//           <Input
//             type="text"
//             placeholder="Réponse"
//             value={card.answer}
//             onChange={(e) =>
//               updateManualFlashcard(card.id, 'answer', e.target.value)
//             }
//           />
//           <Button
//             variant="destructive"
//             size="icon"
//             onClick={() => removeManualFlashcard(card.id)}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       ))}

//       <Button onClick={addManualFlashcard} className="w-full">
//         <Plus className="h-4 w-4" /> Ajouter une carte manuelle
//       </Button>

//       <Button
//         onClick={handleSubmit}
//         disabled={loading || (!manualFlashcards.length && !flashcards.length)}
//         className="w-full"
//       >
//         {loading ? 'Sauvegarde...' : 'Sauvegarder les flashcards'}
//       </Button>
//     </div>
//   );
// }

// export default CreateFlashcard;
