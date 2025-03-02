import { FirstTimeFormProps } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import {
  FirstTimeFormData,
  FirstTimeFormSchema,
} from '@/presentation/components/firstTime/FirstTimeFormSchema';
import { AvatarUpload } from '@/presentation/components/firstTime/avatarSelection';
import { PhoneInput } from '@/presentation/components/firstTime/phoneInput';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function FirstTimeForm({ user, onSubmit }: FirstTimeFormProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const form = useForm<FirstTimeFormData>({
    resolver: zodResolver(FirstTimeFormSchema),
    defaultValues: {
      firstname: user.firstname || '',
      lastname: user.name || '',
      phone: user.phone || '',
      status: user.status || 'student',
      avatar: user.avatar || null,
    },
  });

  const handleSubmit = async (data: FirstTimeFormData) => {
    setLoading(true);

    try {
      await appContainer.getUserService().upsertProfile({
        user_id: user.id,
        ...data,
        email: user.email,
        avatar:
          data.avatar ||
          'https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/profile/public/avatarbase.png',
        created_at: user.created_at,
      });

      onSubmit(true);
    } catch (error) {
      console.error('❌ Erreur:', error);
      onSubmit(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card className="border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            {t('dashboard.firstimeForm.title')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t('dashboard.firstimeForm.description')}</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Section Avatar */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.avatar')}</h3>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AvatarUpload
                          onChange={field.onChange}
                          initialAvatarUrl={field.value}
                          user={{ id: user.id ?? '' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section Informations Personnelles */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">
                    {t('dashboard.firstimeForm.personalInfo')}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dashboard.firstimeForm.firstname')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('dashboard.firstimeForm.firstnameLabel')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dashboard.firstimeForm.name')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('dashboard.firstimeForm.nameLabel')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section Contact */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.contactInfo')}</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dashboard.firstimeForm.phone')}</FormLabel>
                      <FormControl>
                        <PhoneInput
                          phoneNumber={field.value ?? ''}
                          onPhoneChange={field.onChange}
                          className="w-full sm:w-2/3"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        {t('dashboard.firstimeForm.phoneHelper')}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dashboard.firstimeForm.statut')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full sm:w-2/3">
                          <SelectValue placeholder={t('dashboard.firstimeForm.statut')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">
                          {t('dashboard.firstimeForm.student')}
                        </SelectItem>
                        <SelectItem value="pupil">{t('dashboard.firstimeForm.pupil')}</SelectItem>
                        <SelectItem value="apprentice">
                          {t('dashboard.firstimeForm.apprentice')}
                        </SelectItem>
                        <SelectItem value="teacher">
                          {t('dashboard.firstimeForm.teacher')}
                        </SelectItem>
                        <SelectItem value="other">{t('dashboard.firstimeForm.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="min-w-[200px]"
                  disabled={loading || !form.formState.isValid}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('dashboard.firstimeForm.submitting')}
                    </>
                  ) : (
                    t('dashboard.firstimeForm.submit')
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
