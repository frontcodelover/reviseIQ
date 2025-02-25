import { appContainer } from '@/infrastructure/config/AppContainer';
import { Thema } from '@/presentation/components/dashboard/folders/form/thema';
import { ThemaKey } from '@/presentation/components/dashboard/folders/form/themaLabel';
import { Button } from '@/presentation/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { Switch } from '@/presentation/components/ui/switch';
import { Textarea } from '@/presentation/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string(),
  isPublic: z.boolean(),
  thema: z.string(),
  color: z.string(),
  lang: z.string(),
});

interface CreateFolderFormProps {
  onRefresh: () => void;
}

export function CreateFolderForm({ onRefresh }: CreateFolderFormProps) {
  const lang = localStorage.getItem('i18nextLng') || 'fr';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      isPublic: true,
      thema: '',
      color: '#F0F0F0',
      lang: lang,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError('');

    try {
      const { id } = await appContainer.getUserService().createFolder({
        name: values.name,
        description: values.description,
        is_public: values.isPublic,
        color: values.color,
        thema: values.thema,
        lang: values.lang,
      });
      onRefresh();
      navigate(`/dashboard/folders/${id}`);
    } catch {
      setError(t('dashboard.folder.error.create'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-bold">{t('dashboard.folder.createfolder')}</h2>

      <div className="rounded-lg border p-6">
        {error && <div className="mb-4 text-sm text-destructive">{error}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dashboard.folder.form.nameplaceholder')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dashboard.folder.form.descriptionplaceholder')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dashboard.folder.themaLabel')}</FormLabel>
                  <FormControl>
                    <Thema setThema={field.onChange} value={field.value as ThemaKey} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>{t('dashboard.folder.form.public')}</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('dashboard.folder.form.loading')}
                </>
              ) : (
                t('dashboard.folder.form.submit')
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateFolderForm;
