import React, { useState } from 'react';
import { UpsertUserUseCase } from '@/application/useCases/UpsertUser.usecase';
import { SupabaseUserRepository } from '@/infrasctructure/backend/SupabaseUserRepository';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/presentation/components/firstTime/phoneInput';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AvatarSelect } from '@/presentation/components/firstTime/avatarSelection';
import { Button } from '@/components/ui/button';

import { FirstTimeFormProps } from '@/domain/entities/User';


const FirstTimeForm: React.FC<FirstTimeFormProps> = ({ user, onSubmit }) => {
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [status, setStatus] = useState(user.status || 'student');
  const [avatar, setAvatar] = useState('avatar-1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const userRepository = new SupabaseUserRepository();
  const upsertUser = new UpsertUserUseCase(userRepository);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await upsertUser.execute({
        user_id: user.id,
        firstname,
        lastname,
        email: user.email,
        phone,
        status,
        avatar,
      });

      console.log('FirstTime: User updated successfully');

      // Créer un CustomEvent avec des données
      const profileEvent = new CustomEvent('profileUpdated', {
        detail: { userId: user.id, success: true },
      });
      window.dispatchEvent(profileEvent);

      // Attendre un peu avant la redirection
      setTimeout(() => {
        onSubmit();
      }, 100);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl font-bold tracking-tight text-indigo-600">
        {' '}
        {t('title')}
      </h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            {t('dashboard.firstimeForm.firstname')}
          </Label>
          <Input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('dashboard.firstimeForm.firstnameLabel')}
            required
          />
        </div>
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            {t('dashboard.firstimeForm.name')}
          </Label>
          <Input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('dashboard.firstimeForm.nameLabel')}
            required
          />
        </div>

        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">Choisissez votre avatar</Label>
          <AvatarSelect value={avatar} onChange={setAvatar} />
        </div>
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            {t('dashboard.firstimeForm.phone')}
          </Label>
          <PhoneInput phoneNumber={phone} onPhoneChange={setPhone} />
        </div>
        <div className="mb-4">
          <Label className="mb-2 block font-medium text-gray-700">
            {t('dashboard.firstimeForm.statut')}
          </Label>
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other')
            }
          >
            <SelectTrigger className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder={t('dashboard.firstimeForm.statut')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="student">{t('dashboard.firstimeForm.student')}</SelectItem>
                <SelectItem value="pupil">{t('dashboard.firstimeForm.pupil')}</SelectItem>
                <SelectItem value="apprentice">{t('dashboard.firstimeForm.apprentice')}</SelectItem>
                <SelectItem value="teacher">{t('dashboard.firstimeForm.teacher')}</SelectItem>
                <SelectItem value="other">{t('dashboard.firstimeForm.other')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
          disabled={loading}
        >
          {loading ? t('dashboard.firstimeForm.loading') : t('dashboard.firstimeForm.submit')}
        </Button>
      </form>
    </div>
  );
};

export default FirstTimeForm;
