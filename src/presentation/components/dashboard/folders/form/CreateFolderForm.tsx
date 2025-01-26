import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import ColorPicker from '@/presentation/components/dashboard/folders/form/ColorPicker';
import Thema from '@/presentation/components/dashboard/folders/form/thema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FormData } from '@/domain/entities/Folder';

import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';

const userRepository = new SupabaseUserRepository();
const createFolder = new CreateFolder(userRepository);

function CreateDeckForm({ onRefresh }: { onRefresh: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isPublic: true,
    thema: '',
    color: '#F0F0F0',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { id } = await createFolder.execute({
        name: formData.name,
        description: formData.description,
        is_public: formData.isPublic,
        color: formData.color,
        thema: formData.thema,
      });
      onRefresh();
      navigate(`/dashboard/folders/${id}`);
    } catch {
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
      <h2 className="mb-4 text-2xl font-bold">{t('dashboard.folder.createfolder')}</h2>
      <form onSubmit={handleSubmit} className="flex w-full flex-col rounded-lg border p-4">
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="mb-2">
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="w-full rounded-sm border-0 ring-0 placeholder:font-semibold focus:border-0 focus:outline-none focus:ring-0"
            placeholder={t('dashboard.folder.form.nameplaceholder')}
          />

          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
            className="w-full rounded-sm border-0 ring-0 placeholder:text-xs focus:border-0 focus:outline-none focus:ring-0"
            placeholder={t('dashboard.folder.form.descriptionplaceholder')}
          />

          <Thema setThema={(value) => handleChange('thema', value)} value={formData.thema} />
        </div>

        <ColorPicker
          selectedColor={formData.color}
          onSelectColor={(value) => handleChange('color', value)}
          colors={colors}
        />

        <div className="my-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="public-mode"
              checked={formData.isPublic}
              onCheckedChange={(checked) => handleChange('isPublic', checked)}
            />
            <Label htmlFor="public-mode" className="font-medium text-gray-700">
              {t('dashboard.folder.form.public')}
            </Label>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-fit bg-sky-500">
          {loading ? 'Création...' : 'Créer'}
        </Button>
      </form>
    </>
  );
}

export default CreateDeckForm;
