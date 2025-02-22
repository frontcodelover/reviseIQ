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
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export function FirstTimeForm({ user, onSubmit }: FirstTimeFormProps) {
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [status, setStatus] = useState(user.status || 'student');
  const [avatar, setAvatar] = useState<string | null>(user.avatar || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleAvatarChange = useCallback((newAvatarUrl: string | null) => {
    setAvatar(newAvatarUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData: FirstTimeFormData = {
        firstname,
        lastname,
        phone,
        status,
        avatar,
      };

      FirstTimeFormSchema.parse(formData);

      await appContainer.getUserService().upsertProfile({
        user_id: user.id,
        firstname,
        lastname,
        email: user.email,
        phone,
        status,
        avatar:
          avatar ||
          'https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/profile/public/avatarbase.png',
        created_at: user.created_at,
      });

      onSubmit(true);
    } catch (error: unknown) {
      console.error('❌ Erreur:', error);
      if (error instanceof z.ZodError) {
        setError(`Erreur de validation: ${error.errors.map((e) => e.message).join(', ')}`);
      } else {
        setError('Erreur lors de la mise à jour du profil');
      }
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
          {error && (
            <p className="mt-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Avatar */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.avatar')}</h3>
              <AvatarUpload
                key={avatar}
                onChange={handleAvatarChange}
                initialAvatarUrl={avatar}
                user={{ id: user.id || '' }}
              />
            </div>

            {/* Section Informations Personnelles */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.personalInfo')}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstname">{t('dashboard.firstimeForm.firstname')}</Label>
                  <Input
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    placeholder={t('dashboard.firstimeForm.firstnameLabel')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname">{t('dashboard.firstimeForm.name')}</Label>
                  <Input
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    placeholder={t('dashboard.firstimeForm.nameLabel')}
                  />
                </div>
              </div>
            </div>

            {/* Section Contact */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.contactInfo')}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                <Label>{t('dashboard.firstimeForm.phone')}</Label>
                <PhoneInput
                  phoneNumber={phone}
                  onPhoneChange={setPhone}
                  className="w-full sm:w-2/3"
                />
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.firstimeForm.phoneHelper')}
                </p>
              </div>
            </div>

            {/* Section Status */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium">{t('dashboard.firstimeForm.profile')}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t('dashboard.firstimeForm.statut')}</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
                  <SelectTrigger className="w-full sm:w-2/3">
                    <SelectValue placeholder={t('dashboard.firstimeForm.statut')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{t('dashboard.firstimeForm.student')}</SelectItem>
                    <SelectItem value="pupil">{t('dashboard.firstimeForm.pupil')}</SelectItem>
                    <SelectItem value="apprentice">
                      {t('dashboard.firstimeForm.apprentice')}
                    </SelectItem>
                    <SelectItem value="teacher">{t('dashboard.firstimeForm.teacher')}</SelectItem>
                    <SelectItem value="other">{t('dashboard.firstimeForm.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button type="submit" size="lg" className="min-w-[200px]" disabled={loading}>
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
        </CardContent>
      </Card>
    </div>
  );
}
