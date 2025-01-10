import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackend } from '@/services/backend';
import { Button } from '@/components/ui/button';
import ColorPicker from '@/components/dashboard/folders/colorPicker';
import Thema from '@/components/dashboard/folders/form/thema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function CreateDeckForm({
	onRefresh,
}: {
		onRefresh: () => void;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [thema, setThema] = useState('');
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
        thema,
      });
      setName('');
      setDescription('');
      setIsPublic(true);
		onRefresh(); // Actualise le nombre
      navigate('/dashboard/folders'); // Redirige l'utilisateur vers la liste des decks
    } catch (error) {
      console.error('Erreur lors de la création du deck :', error);
      setError('Impossible de créer le deck. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    '#000000',
    '#404040',
    '#b91c1c',
    '#b45309',
    '#4d7c0f',
    '#047857',
    '#0e7490',
    '#1d4ed8',
    '#6d28d9',
    '#a21caf',
    '#facc15',
  ];

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Créer un Deck</h2>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 rounded-lg bg-white"
      >
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            Nom du deck
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez un nom pour votre deck"
          />
        </div>

        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ajoutez une description (facultatif)"
          />
        </div>

        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">Thème</Label>
          <Thema setThema={setThema} value={thema} />
        </div>

        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            Couleur
          </Label>
          <ColorPicker
            selectedColor={color}
            onSelectColor={setColor}
            colors={colors}
          />
        </div>
        <div className="mb-4">
          <Label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">Dossier public</span>
          </Label>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer'}
        </Button>
      </form>
    </>
  );
}

export default CreateDeckForm;
