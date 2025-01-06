import { useState } from 'react';
import { getBackend } from '../services/backend';
import { Button } from '@/components/ui/button';
import ColorPicker from './dashboard/folders/colorPicker';


function CreateDeckForm({ onDeckCreated }: { onDeckCreated: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [color, setColor] = useState('#F0F0F0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const backend = getBackend();
      await backend.createDeck({
        name,
        description,
        is_public: isPublic,
        color,
      });
      setName('');
      setDescription('');
      setIsPublic(true);
      onDeckCreated(); // Notifie le parent que le deck a été créé
    } catch (error) {
      console.error('Erreur lors de la création du deck :', error);
      setError('Impossible de créer le deck. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
	
  const colors = ['#000000', '#404040', '#b91c1c', '#b45309', '#4d7c0f', '#047857', '#0e7490', '#1d4ed8', '#6d28d9', '#a21caf', '#facc15'];

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Créer un Deck</h2>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700">
          Nom du deck
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez un nom pour votre deck"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ajoutez une description (facultatif)"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Deck Public</span>
        </label>
      </div>

   
      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700">Couleur</label>
        <ColorPicker selectedColor={color} onSelectColor={setColor} colors={colors} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Création...' : 'Créer'}
      </Button>
    </form>
  );
}

export default CreateDeckForm;
