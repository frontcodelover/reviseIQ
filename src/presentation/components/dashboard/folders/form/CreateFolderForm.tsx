import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, FormLabel, Input, Switch, Textarea } from '@mui/joy';

import Thema from '@/presentation/components/dashboard/folders/form/thema';
import { FormData } from '@/domain/entities/Folder';

import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { CreateFolder } from '@/application/useCases/folder/CreateFolder.usecase';
import Typography from '@mui/joy/Typography';

const userRepository = new SupabaseUserRepository();
const createFolder = new CreateFolder(userRepository);

function CreateDeckForm({ onRefresh }: { onRefresh: () => void }) {
  const lang = localStorage.getItem('i18nextLng') || 'fr';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isPublic: true,
    thema: '',
    color: '#F0F0F0',
    lang: lang,
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
        lang: formData.lang,
      });
      onRefresh();
      navigate(`/dashboard/folders/${id}`);
    } catch {
      setError('Impossible de créer le deck. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography level="h2" fontWeight="bold" mb={2}>
        {t('dashboard.folder.createfolder')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 'md',
          border: '1px solid',
          borderColor: 'neutral.outlinedBorder',
        }}
      >
        {error && (
          <Typography color="danger" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormControl>
              <FormLabel>{t('dashboard.folder.form.nameplaceholder')}</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t('dashboard.folder.form.descriptionplaceholder')}</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                minRows={2}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Thème</FormLabel>
              <Thema setThema={(value) => handleChange('thema', value)} value={formData.thema} />
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
              <FormLabel htmlFor="public-mode">{t('dashboard.folder.form.public')}</FormLabel>
              <Switch
                id="public-mode"
                checked={formData.isPublic}
                onChange={(e) => handleChange('isPublic', e.target.checked)}
              />
            </Box>
            <Button type="submit" loading={loading}>
              {loading ? 'Création...' : 'Créer'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CreateDeckForm;
