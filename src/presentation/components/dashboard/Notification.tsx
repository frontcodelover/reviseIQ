// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/infrastructure/backend/SupabaseClient';

// function Notification() {
//   const [decks, setDecks] = useState([]);

//   // fetch all post from supabase decks
//   useEffect(() => {
//     // Récupération initiale des decks
//     async function fetchDecks() {
//       const { data, error } = await supabase.from('decks').select('*');
//       if (error) {
//         console.error('Erreur de fetch:', error);
//         return;
//       }
//       setDecks(data);
//     }

//     fetchDecks();

//     // Configuration du channel pour le real-time
//     const channel = supabase
//       .channel('decks-changes')
//       .on(
//         'postgres_changes',
//         {
//           event: 'INSERT',
//           schema: 'public',
//           table: 'decks',
//         },
//         (payload) => {
//           setDecks((currentDecks) => [...currentDecks, payload.new]);
//         }
//       )
//       .subscribe();

//     // Cleanup de l'abonnement
//     return () => {
//       channel.unsubscribe();
//     };
//   }, []);

//   return (
//     <div>
//       {decks.map((deck) => (
//         <div key={deck.id}>
//           <h3>{deck.name}</h3>
//           <p>{deck.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Notification;
